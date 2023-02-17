import responseInfo from '../config/responseInfo'
import User from '../static/User'
import { Response } from 'express'
import { UserModel, DepartmentModel, DoctorModel, DoctorPictureModel, DoctorAvailableWeekModel, DoctorAvailableTimeModel, InquiryModel, VisitRecordModel, DrugDeliveryModel, PushInformationModel } from '../model/dbmodel'
import {
  applyToBeDoctorType, checkCodeDataType, checkCodeType, loginDataType,
  resetPassDatType, resetUserInfoType, sendCheckDataType, updateDepartmentNameType,
  availableTimeType, resetDoctorInfoType,
  changeDoctorStatusType,
  adminApprovalDoctorCancelStatusType, getOneDoctorType, personAskDoctorType,
  doctorWirteVisitRecordType,
  createDistributionType,
  updataDistributionType,
  judgeDoctorIsFreeType,
  pushInfoModelType,
  pushInfoType,
  updatePushInfoType,
  inqueryType,
  updateinqueryType,
  findDocType
} from '../config/type'
import { checkCodeEmail, signUpEmail } from './emailServe'
import { getRandOmCode, resetPassCodeTime, Token, ObjectSimpleShallowCopy, ROLE, AUDITSTATUS, APPOINTMENT } from '../config/default'
import { createToken } from './jsonWebToken'
import { Document as mongoDocument } from 'mongoose'
import { ObjectId } from 'mongodb'

// 用户验证标识数据
let checkCodeObject: checkCodeDataType = {}

/**
 * 用户注册
 * @param { User } data 注册表格数据
 * @param { Response } res 响应
 */
function newUser({ name, password, email, phone, role }: User, res: Response) {
  // 判断当前邮箱是否已经被注册
  UserModel.countDocuments({ email: email }).then((result: number) => {
    console.log(result);

    if (result !== 0) {
      res.send(responseInfo.registerException('register failed, the email has been used!'))
      // 中断Promise调用链
      return new Promise((resolve, reject) => { })
    }
    // 密码加密
    let user = new User(name, password, email, phone, role)
    return new UserModel(user.encrypt()).save()
  }).then(() => {
    try {
      signUpEmail(email)
      res.send(responseInfo.success('register successfully'))
    } catch (error) { res.send(responseInfo.emailException('register failed, wrong email')) }// 获取邮箱发送失败的异常，避免服务端崩溃
  }).catch(err => { res.send(responseInfo.requestException(err)) })
}

/**
 * 用户登录
 * @param { loginDataType } data 用户登录数据
 * @param { Response } res 响应
 */
function login({ username, password }: loginDataType, res: Response) {
  // console.log(username);
  UserModel.findOne({ email: username }, { lastLogin: 0 }).then(async (result: any) => {
    if (!result) {      // 没有检索到数据
      res.send(responseInfo.loginException('wrong email or password'))
    }
    if (User.check(password, result.password)) {
      let back: Record<string, any> = ObjectSimpleShallowCopy(result._doc)
      createToken(result._id).then(token => {
        back.token = token
        delete back.password
        delete back.__v
        return UserModel.updateOne({ email: username }, { lastLogin: new Date() })
      }).then(() => {
        // if (result.role == ROLE.Docotr) {
        //   console.log(back.id);
        //   DoctorModel.findOne({ userId: back.id }).then((res1: any) => {
        //     console.log(res1);
        //     console.log(res1._doc);
        //     back.doctor = ObjectSimpleShallowCopy(res1._doc)
        //     res.send(responseInfo.success(back))
        //   }).catch((err) => {
        //     console.log(err);
        //     res.send(responseInfo.getException(err))
        //   })
        // } else {
        res.send(responseInfo.success(back))
        // }
      }).catch((error) => {
        console.log(error);
        res.send(responseInfo.loginException(error))
      })
    } else {
      res.send(responseInfo.loginException('wrong email or password'))
    }
  }).catch((err) => {
    console.log(err);
    res.send(responseInfo.searchException(err))
  })
}

/**
 * 获取用户个人信息
 * @param { Record<string, any> } data 用户登录数据
 * @param { Response } res 响应
 */
function getUserInfo({ id }: Record<string, any>, res: Response) {
  let back: any
  UserModel.findOne({ _id: new ObjectId(id) }).then((res1: any) => {
    back = ObjectSimpleShallowCopy(res1._doc)
    if (res1.role == ROLE.Docotr) {
      return DoctorModel.findOne({ userId: id })
    } else {
      res.send(responseInfo.success(back))
      return new Promise((resolve, reject) => { })
    }
  }).then((res2: any) => {
    back.doctor = ObjectSimpleShallowCopy(res2._doc)
    res.send(responseInfo.success(back))
  }).catch((err: Error) => {
    res.send(responseInfo.getException(err))
  })
}

/**
 * 发送验证邮箱
 * @param { sendCheckDataType } data 请求数据 
 * @param { Response } res 响应
 */
function sendCheckMail({ id, email }: sendCheckDataType, res: Response) {
  let checkData: checkCodeType = { code: getRandOmCode(), time: new Date(new Date().getTime() + resetPassCodeTime) }
  checkCodeObject[id] = checkData
  try {
    checkCodeEmail(email, checkData.code)
    res.send(responseInfo.success('verify code has been sent, valid in 2 min'))
  } catch (error) {
    res.send(responseInfo.emailException(error))
  }
}

/**
 * 重新设置密码
 * @param { resetPassDatType } data 请求数据
 * @param { Response } res 响应
 */
function resavePassword({ id, pass, againPass, code }: resetPassDatType, res: Response) {
  if (!checkCodeObject[id]) {                      // 没有生成验证码前不能进行修改密码的操作
    res.send(responseInfo.requestException('please get the verify code'))
  } else if (code !== checkCodeObject[id].code) {         // 检验验证码是否正确
    res.send(responseInfo.checkException())
  } else if (checkCodeObject[id].time <= new Date()) {    // 验证码超时
    delete checkCodeObject[id]
    res.send(responseInfo.checkException('verify code is invalid, please get a new one'))
  } else if (pass !== againPass) {                        // 两次密码不一致
    res.send(responseInfo.requestException('the two passwords are different. Please re-enter them'))
  } else {
    delete checkCodeObject[id]
    UserModel.updateOne({ _id: id }, { password: User.encryptPass(pass) })
      .then(() => { res.send(responseInfo.success('modify successfully')) })
      .catch(() => { res.send(responseInfo.updataException('Failed to change the password. Please try again')) })
  }
}

/**
 * 重新设置用户信息
 * @param { resetUserInfo } data 请求数据
 * @param { Response } res 响应
 */
function resaveUserInfo({ id, phone, address, allergy, name, birth, gender }: resetUserInfoType, res: Response) {
  let updateObject = { phone, address, allergy, name, birth, gender }
  UserModel.updateOne({ _id: id }, updateObject)
    .then(() => { res.send(responseInfo.success('modify successfully')) })
    .catch(() => { res.send(responseInfo.updataException('modify failed')) })
}

/**
 * 重新设置医生信息
 * @param { resetDoctorInfo } data 请求数据
 * @param { Response } res 响应
 */
function resaveDoctorInfo({ id, phone, identity, hospitalName, name, hospitalLevel, hospitalAddress, job, strength, selfIntro, departmentId, gender }: resetDoctorInfoType, res: Response) {
  let updateObject = { phone, identity, hospitalName, name, hospitalLevel, hospitalAddress, job, strength, selfIntro, departmentId, gender }
  UserModel.updateOne({ _id: id }, updateObject)
    .then(() => { res.send(responseInfo.success('modify successfully')) })
    .catch(() => { res.send(responseInfo.updataException('modify failed')) })
}

/**
 * 新增科室
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function addDepartment({ id, name }: Record<string, string>, res: Response) {
  DepartmentModel.find({ name }).then((result: Array<any>) => {
    if (result.length !== 0) {
      res.send(responseInfo.updataException('该科室已存在,请勿重复创建'))
      return new Promise((resolve, reject) => { })
    }
    return new DepartmentModel({ name }).save()
  }).then((result: any) => {
    res.send(responseInfo.success(result))
  }).catch((err: Error) => { res.send(responseInfo.updataException(err.message)) })
}

/**
 * 更新科室名称
 * @param { updateDepartmentNameType } data 请求数据
 * @param { Response } res 响应
 */
function updateDepartmentName({ id, name, departId }: updateDepartmentNameType, res: Response) {
  DepartmentModel.updateOne({ _id: departId }, { name, updateTime: new Date() }).then(() => {
    res.send(responseInfo.success('修改成功'))
  }).catch((err: Error) => { res.send(responseInfo.updataException(err)) })
}

/**
 * 获取所有科室信息
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function getAllDepartment({ id }: Record<string, string>, res: Response) {
  DepartmentModel.find().then((result: Array<any>) => {
    res.send(responseInfo.success(result))
  }).catch((error: Error) => res.send(responseInfo.searchException(error)))
}

/**
 * 申请成为医生
 * @param { applyToBeDoctorType } applyToBeDoctorData 请求数据
 * @param { Response } res 响应
 */
function applyToBeDoctor(applyToBeDoctorData: applyToBeDoctorType, res: Response) {
  let {
    doctorName, id, identity, hospitalName, hospitalLevel, hospitalAddress,
    departmentId, job, strength, selfIntro, availabletime, availableWeek,
    identityFront, identityBack, certification, workCertificate
  }: applyToBeDoctorType = applyToBeDoctorData
  let arr = [undefined, '', null]
  for (let v in applyToBeDoctorData) {
    if (arr.includes((applyToBeDoctorData as any)[v])) {
      res.send(responseInfo.requestException('Missing request parameter'))
      return;
    }
  }
  let doctorData = { name: doctorName, userId: id, identity, hospitalName, hospitalLevel, hospitalAddress, departmentId, job, strength, selfIntro }
  DoctorModel.findOne({ userId: id }).then((result: any) => {
    let tmpAry = [AUDITSTATUS.NoPass, AUDITSTATUS.Canceled]
    if (result && tmpAry.includes(result.status)) DoctorModel.deleteMany({ userId: id })         // 删除之前申请失败的数据，可以直接异步删除
    else if (result && result.status === AUDITSTATUS.Reviewing) throw new Error('already have applicaion data')       // 如果有数据，并且状态为申请中，则直接抛出申请中的异常
    else if (result && result.status === AUDITSTATUS.Approved) throw new Error('already qualified')     // 如果有数据，并且状态为申请成功，则直接抛出已成为医生的异常
    return new DoctorModel(doctorData).save()           // 如果没有数据，则直接保存新的医生申请
  }).then((result: any) => {   // 保存成功之后获取对应的doctorId
    let doctorPictureData = { doctorId: result._id, identityFront, identityBack, certification, workCertificate }
    let doctorAvailableWeekData: Record<string, boolean | string> = ObjectSimpleShallowCopy(availableWeek as Record<string, boolean>)
    doctorAvailableWeekData.doctorId = result._id
    let promises: Array<Promise<mongoDocument<unknown, any, any>>> = [
      new DoctorPictureModel(doctorPictureData).save(),                   // 医生申请对应的图片数据
      new DoctorAvailableWeekModel(doctorAvailableWeekData).save(),       // 医生空闲星期
      new DoctorAvailableTimeModel({
        doctorId: result._id, startTime: availabletime[0], endTime: availabletime[1]
      } as availableTimeType).save()
    ]
    return Promise.all(promises)
  }).then((result: Array<any>) => {
    res.send(responseInfo.success('The application is successful, please wait for the administrator further review'))
  }).catch((error: Error) => {
    res.send(responseInfo.applyException(error))
    // res.send(error);
  })
}

/**
 * 管理员agree医生状态
 * @param { applyToBeDoctorType } data 请求数据
 * @param { Response } res 响应
 */
function adminApprovalDoctorStatus({ userId, status }: changeDoctorStatusType, res: Response) {
  // TODO 后续有兴趣可以通过id写审批日志
  console.log(userId);
  console.log(status);
  if (!status) {
    res.send(responseInfo.requestException('Missing request parameter'))
    return;
  }
  if (!(status in AUDITSTATUS)) {
    res.send(responseInfo.registerException('Approval type error'))
    return;
  }
  DoctorModel.findOneAndUpdate({ userId }, { status: AUDITSTATUS[(status as keyof typeof AUDITSTATUS)] }).then(() => {
    return UserModel.findOneAndUpdate({ _id: userId }, { role: status === 'Approved' ? ROLE.Docotr : ROLE.Normal })
  }).then(() => {
    res.send(responseInfo.success('Approve succcessfully'))
  }).catch((error: Error) => res.send(responseInfo.requestException(error)))
}

/**
 * 管理员reject医生状态
 * @param { applyToBeDoctorType } data 请求数据
 * @param { Response } res 响应
 */
function adminRejectDoctorStatus({ userId, status }: changeDoctorStatusType, res: Response) {
  // TODO 后续有兴趣可以通过id写审批日志
  console.log(userId);
  console.log(status);
  if (!status) {
    res.send(responseInfo.requestException('Missing request parameter'))
    return;
  }
  if (!(status in AUDITSTATUS)) {
    res.send(responseInfo.registerException('Approval type error'))
    return;
  }
  DoctorModel.findOneAndUpdate({ userId }, { status: AUDITSTATUS[(status as keyof typeof AUDITSTATUS)] }).then(() => {
    return UserModel.findOneAndUpdate({ _id: userId }, { role: status === 'NoPass' ? ROLE.Docotr : ROLE.Normal })
  }).then(() => {
    res.send(responseInfo.success('Approve succcessfully'))
  }).catch((error: Error) => res.send(responseInfo.requestException(error)))
}

/**
 * 医生申请取消成为医生
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function doctorCancelToBeDoctor({ id }: Record<string, string>, res: Response) {
  DoctorModel.findOne({ userId: id }).then((result: any) => {
    if (!result) res.send(responseInfo.roleException())
    return DoctorModel.updateOne({ userId: id }, { status: AUDITSTATUS.Canceling })
  }).then((result: any) => {
    res.send(responseInfo.success('The application is successful. Please wait for the administrator approval'))
  }).catch((error: Error) => res.send(responseInfo.applyException(error)))
}

/**
 * 管理员审批医生的取消申请
 * @param { adminApprovalDoctorCancelStatusType } data 请求数据
 * @param { Response } res 响应
 */
function adminApprovalDoctorCancelStatus({ userId, bool }: adminApprovalDoctorCancelStatusType, res: Response) {
  DoctorModel.findOneAndUpdate({ userId }, { status: bool ? AUDITSTATUS.Canceled : AUDITSTATUS.Approved }).then((result: any) => {
    let doctorId = result._id
    bool && DoctorAvailableTimeModel.deleteMany({ doctorId })             // 如果同意其取消医生的资格，则直接删掉对应的空闲时间
    bool && DoctorAvailableWeekModel.deleteMany({ doctorId })             // 如果同意其取消医生的资格，则直接删掉对应的空闲时间
    res.send(responseInfo.success('Approve succcessfully'))
  }).catch((error: Error) => res.send(responseInfo.requestException(error)))
}

/**
 * 获取医生列表
 * @param { Record<string, string> } data 请求数据 如果需要获取全部的医生数据可以可以将status设置为undefined，如果需要获取已经成为医生的数据则给对应的status
 * @param { Response } res 响应
 */
function getAllDoctor({ status }: Record<string, string>, res: Response) {
  // DoctorModel.find(status == undefined?{}:{status}).then((result:Array<any>) => {
  //   console.log("this is res " + res);
  //   console.log("this is result " + result);
  //   res.send(responseInfo.success(result))
  // }).catch((err:Error) => res.send(responseInfo.getException(err)))
  DoctorModel.aggregate([{
    $lookup: {
      from: "users", // collection name in db
      localField: "userId",
      foreignField: "_id",
      as: "userInfo"
    }
  }]).exec(function (err, result) {
    res.send(responseInfo.success(result))
    // students contain WorksnapsTimeEntries
  });
}

function getOneDoctor({ id, name, hospitalName, hospitalLevel, hospitalAddress, job, strength, status, selfIntro }: getOneDoctorType, res: Response) {
  let findObject = { name, hospitalName, hospitalLevel, hospitalAddress, job, strength, status, selfIntro }
  DoctorModel.findOne({ userId: id }, findObject)
    .then(() => { res.send(responseInfo.success('found')) })
    .catch(() => { res.send(responseInfo.updataException('not found')) })
}

/**
 * 用户进行问诊预约
 * @param { personAskDoctorType } data 请求数据
 * @param { Response } res 响应
 */
function personAskDoctor({ id, doctorId, selfReport, allergyMedicine, appointmentTime, appointmentDate }: personAskDoctorType, res: Response) {
  let InquiryData = { userId: id, doctorId, selfReport, allergyMedicine, appointmentTime, appointmentDate }
  DoctorModel.countDocuments({ _id: doctorId }).then((num: number) => {
    if (num == 0) { throw new Error('The doctor does not exist') }
    return new InquiryModel(InquiryData).save()
  }).then((result: any) => {
    res.send(responseInfo.success('Successfully appointment'))
  }).catch((err: Error) => res.send(responseInfo.applyException(err)))
}

/**
 * 判断医生在当前时间段是否有空进行问诊
 * 判断医生在当前时间段是否有空进行问诊
 * @param { personAskDoctorType } data 请求数据 需要前端自行判断在当前的date以及time，医生资料上是否显示有空接诊
 */
function judgeDoctorIsFree({ doctorId, date, time }: judgeDoctorIsFreeType, res: Response) {
  InquiryModel.find({ doctorId, status: APPOINTMENT.Not }).then((result: Array<any>) => {
    result.map((element: any) => {
      let arrStr: Array<string> = element.appointmentTime.split('~')
      if (date == element.appointmentDate && time.startTime == arrStr[0] && time.endTime == arrStr[1]) {
        throw new Error()
      }
    })
    res.send(responseInfo.success(true))
  }).catch(() => res.send(responseInfo.success(false)))
}

/**
 * 医生获取他们对应的患者
 * * @param { doctorWirteVisitRecordType } data 请求数据
 * @param { Response } res 响应
 */
function getInquiryList({ doctorId }: Record<string, string>, res: Response) {
  InquiryModel.find({ doctorId: doctorId }).then((result: Array<any>) => {
    // DoctorModel.find({ doctorId: doctorId }).then((result: Array<any>) => {
    if (!result) { throw new Error() }
    res.send(responseInfo.success(result))
  }).catch((err: Error) => res.send(responseInfo.getException(err)))

  // InquiryModel.aggregate([{
  //   $lookup: {
  //     from: "doctors", // collection name in db
  //     localField: "doctorId",
  //     foreignField: "_id",
  //     as: "patientInfo"
  //   }
  // }]).exec(function (err, result) {
  //   res.send(responseInfo.success(result))
  //   // students contain WorksnapsTimeEntries
  // });
}

/**
 * 医生写就诊记录
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function doctorWirteVisitRecord(data: doctorWirteVisitRecordType, res: Response) {
  let { inquiryId } = data
  VisitRecordModel.findOne({ inquiryId: inquiryId }, {}).then((num: any) => {
    // if (num != null) { throw new Error('Please do not fill in the medical records repeatedly') }
    let promises = [
      new VisitRecordModel(data).save(),
      InquiryModel.updateOne({ _id: inquiryId }, { status: APPOINTMENT.End })
    ]
    return Promise.all(promises)
  }).then((result: any) => {
    res.send(responseInfo.success('Save successfully'))
  }).catch((err: Error) =>
    // console.log(err))
  res.send(responseInfo.updataException(err)))
}

/**
 * 获取就诊记录列表 VisitRecordModel
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function getVisitRecordList(data: Record<string, string>, res: Response) {
  InquiryModel.find(data).then((result: Array<any>) => {
    res.send(responseInfo.success(result))
  }).catch((err: Error) => res.send(responseInfo.getException(err)))
}

/**
 * 获取医生空余时间time列表
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function getTimeList(data: Record<string, string>, res: Response) {
  DoctorAvailableTimeModel.find(data).then((result: Array<any>) => {
    res.send(responseInfo.success(result))
  }).catch((err: Error) => res.send(responseInfo.getException(err)))
}

/**
 * 获取医生空余时间time列表
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function getDateList(data: Record<string, string>, res: Response) {
  DoctorAvailableWeekModel.find(data).then((result: Array<any>) => {
    res.send(responseInfo.success(result))
  }).catch((err: Error) => res.send(responseInfo.getException(err)))
}

/**
 * 创建配送药单
 * @param { createDistributionType } data 请求数据
 * @param { Response } res 响应
 */
function createDistribution({ id, name, phone, period, quantities, subject, other }: createDistributionType, res: Response) {
  let data = { userId: id, name, phone, period, quantities, subject, other }
  new DrugDeliveryModel(data).save().then((result: any) => {
    res.send(responseInfo.success('Successfully created'))
  }).catch((err: Error) => res.send(responseInfo.updataException(err)))
}

/**
 * 修改配送药单
 * @param { createDistributionType } data 请求数据 如果不需要修改对应的数据， 可以不给对应的字段
 * @param { Response } res 响应
 */
function updataDistribution({ id, drugId, name, phone, period, quantities, subject, status, other }: updataDistributionType, res: Response) {
  DrugDeliveryModel.find({ _id: drugId }).then((result: Array<any>) => {
    if (result.length == 0) { throw new Error('No such order can be found') }
    if (result[0].userId !== id) { throw new Error('You do not have permission to change this distribution') }
    let updata = { name, phone, period, quantities, subject, status, other }
    return DrugDeliveryModel.updateOne({ _id: drugId }, updata)
  }).then((result: any) => {
    res.send(responseInfo.success('Modified successfully'))
  }).catch((err: Error) => res.send(responseInfo.updataException(err)))
}

/**
 * 获取首页推送信息
 * @param { Record<string, string> } data 请求数据
 * @param { Response } res 响应
 */
function getPushInfoList({ }: Record<string, string>, res: Response) {
  PushInformationModel.find().then((result: Array<pushInfoModelType>) => {
    res.send(responseInfo.success(result))
  }).catch((err: Error) => res.send(responseInfo.getException(err)))
}

/**
 * 新增首页推送信息
 * @param { pushInfoType } data 请求数据
 * @param { Response } res 响应
 */
function addPushInfo({ title, link, coverLink }: pushInfoType, res: Response) {
  new PushInformationModel({ title, link, coverLink }).save().then((result: pushInfoModelType) => {
    res.send(responseInfo.success('Save successfully'))
  }).catch((err: Error) => res.send(responseInfo.updataException(err)))
}

/**
 * 更新首页推送信息
 * @param { updatePushInfoType } data 请求数据
 * @param { Response } res 响应
 */
// function updataPushInfo({ infoId, title, link, coverLink }: updatePushInfoType, res: Response) {
//   PushInformationModel.findOne({ _id: infoId }).then((result: any) => {
//     if (!result) { throw new Error('No such push is displayed') }
//     return PushInformationModel.updateOne({ _id: infoId }, { title, link, coverLink })
//   }).then((result: any) => {
//     res.send(responseInfo.success('Modified successfully'))
//   }).catch((err: Error) => res.send(responseInfo.updataException(err)))
// }

function updataPushInfo({ inqueryId, selfReport, allergyMedicine, appointmentTime, appointmentDate, status, time }: updateinqueryType, res: Response) {
  console.log(inqueryId);
  InquiryModel.findOne({ _id: inqueryId }).then((result1: any) => {
    console.log("result: ");
    if (!result1) { throw new Error('No such push is displayed') }
    return InquiryModel.updateOne({ _id: inqueryId }, { selfReport, allergyMedicine, appointmentTime, appointmentDate, status, time })
  }).then((result: any) => {
    console.log(result);
    res.send(responseInfo.success('Modified successfully'))
  }).catch((err: Error) => {
    console.log(err);
    res.send(responseInfo.updataException(err))
  })
}

// DoctorModel.find(status == undefined?{}:{status}).then((result:Array<any>) => {
//   console.log("this is res " + res);
//   console.log("this is result " + result);
//   res.send(responseInfo.success(result))
// }).catch((err:Error) => res.send(responseInfo.getException(err)))

function findDoc({ doctorId }: findDocType, res: Response) {
  console.log("1: " + doctorId);
  DoctorPictureModel.findOne({ doctorId: doctorId }).then((result: any) => {
    // console.log("2: " + doctorId);
    if (!result) { throw new Error('No such document is found') }
    res.send(responseInfo.success(result))
  }).catch((err: Error) => {
    console.log(err);
    res.send(responseInfo.updataException(err))
  })
}

/**
 * 删除首页推送信息
 * @param { updatePushInfoType } data 请求数据
 * @param { Response } res 响应
 */
function deletePushInfo({ infoId }: updatePushInfoType, res: Response) {
  PushInformationModel.findOne({ _id: infoId }).then((result: any) => {
    // console.log("the result is : " + result);
    // console.log(infoId);
    if (!result) { throw new Error('No such push is displayed') }
    return PushInformationModel.deleteMany({ _id: infoId })
  }).then((result: any) => {
    res.send(responseInfo.success('Deleted successfully'))
  }).catch((err: Error) => res.send(responseInfo.updataException(err)))
}


let FunctionSet = {
  newUser, login, sendCheckMail, resavePassword, resaveUserInfo, addDepartment, updateDepartmentName,
  getAllDepartment, applyToBeDoctor, adminApprovalDoctorStatus, doctorCancelToBeDoctor,
  adminApprovalDoctorCancelStatus, adminRejectDoctorStatus, getAllDoctor, resaveDoctorInfo, getOneDoctor, personAskDoctor, getInquiryList,
  doctorWirteVisitRecord, getVisitRecordList, createDistribution, updataDistribution,
  judgeDoctorIsFree, getPushInfoList, addPushInfo, updataPushInfo, deletePushInfo, getUserInfo, getTimeList, getDateList, findDoc
}

export default FunctionSet