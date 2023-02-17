import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import db from "../config/db";
import { ROLE, GENDER, AUDITSTATUS, DELIVERY, APPOINTMENT } from '../config/default'
import { pushInfoModelType } from "../config/type";

// 用户表
const UserSchema = new Schema({
  name: { type: String },                                                        // 用户名
  email: { type: String },                                                       // 邮箱
  password: { type: String },                                                    // 密码
  phone: { type: String },
  gender: { type: String, enum: GENDER, default: GENDER.Neutral },                // 性别
  role: { type: String, enum: ROLE, default: ROLE.Normal },                       // 功能权限
  address: { type: String, default: '' },                                        // 用户住址
  allergy: { type: String, default: '' },                                         // 过敏药物
  birth: { type: Date, default: new Date(0) },                                  // 出生日期
  register: { type: Date, default: new Date() },                                // 注册时间
  lastLogin: { type: Date, default: new Date() },                               // 最后登录时间
})

// 科室表
const DepartmentSchema = new Schema({
  name: { type: String, require: true },                                         // 科室名称
  createTime: { type: Date, default: new Date() },                               // 创建日期
  updateTime: { type: Date, default: new Date() },                               // 修改日期
})

// Token表
const TokenSchema = new Schema({
  userId: { type: String, require: true },                                       // 用户ID
  token: { type: String },                                                       // 用户对应Token
  expirationTime: { type: Number }                                               // Token过期时间
})

// 医生表
const DoctorSchema = new Schema({
  userId: { type: ObjectId, require: true },                                       // 用户ID
  name: { type: String, require: true },                                         // 医生名字
  identity: { type: String, require: true },                                     // 身份证
  hospitalName: { type: String, default: '' },                                    // 医院名称
  hospitalLevel: { type: String, default: '' },                                   // 医院等级
  hospitalAddress: { type: String, default: '' },                                 // 医院地址
  zoomlink: { type: String, default: '' }, 
  departmentId: { type: String },                                                // 科室ID
  job: { type: String, default: '' },                                             // 具体岗位
  strength: { type: String, default: '' },                                        // 优势长项
  selfIntro: { type: String, default: '' },                                       // 自我介绍
  status: { type: String, enum: AUDITSTATUS, default: AUDITSTATUS.Reviewing },    // 审核状态
})

// 医生空闲时间表
const DoctorAvailableTimeSchema = new Schema({
  doctorId: { type: String, require: true },                                     // 医生标识ID
  startTime: { type: String },                                                   // 开始时间
  endTime: { type: String },                                                     // 结束时间
})

// 医生空闲星期表
const DoctorAvailableWeekSchema = new Schema({
  doctorId: { type: String, require: true },                                     // 医生标识ID
  Mon: { type: Boolean, default: false },                                         // 周一
  Tues: { type: Boolean, default: false },                                        // 周二
  Wed: { type: Boolean, default: false },                                         // 周三
  Thurs: { type: Boolean, default: false },                                       // 周四
  Fri: { type: Boolean, default: false },                                         // 周五
  Sat: { type: Boolean, default: false },                                         // 周六
  Sun: { type: Boolean, default: false },                                         // 周日
})

// 医生审核资料照片表
const DoctorPictureSchema = new Schema({
  doctorId: { type: String, require: true },                                     // 医生标识ID
  identityFront: { type: String, default: null },                                // 身份证正面照
  identityBack: { type: String, default: null },                                 // 身份证反面照
  certification: { type: String, default: null },                                // 资质证书
  workCertificate: { type: String, default: null },                              // 工作证明
})

// 问诊表
const InquirySchema = new Schema({
  userId: { type:String, require: true },                                       // 用户ID
  doctorId: { type:String, require: true },                                     // 医生标识ID
  selfReport: { type:String, require: true },                                   // 病情自述
  allergyMedicine: { type:Array<string>, default: [] },                         // 过敏药物
  appointmentTime: { type:String, require: true },                              // 预约时间
  appointmentDate: { type:Date, require: true },                                // 预约日期
  status: { type:String, default:APPOINTMENT.Not },           // 问诊预约状态
  time: { type:Date, default: new Date() },                                     // 问诊创建日期
})

// 就诊记录表
const VisitRecordSchema = new Schema({
  inquiryId: { type:String, require: true },                                    // 问诊记录ID
  userId: { type:String, require: true },                                       // 用户ID
  doctorId: { type:String, require: true },                                     // 医生标识ID
  name: { type:String, require: true },                                         // 患者名称
  age: { type:Number, require: true },                                          // 患者年纪
  gender: { type:String, enum:GENDER, require: true },                          // 性别
  consultDate: { type:Date, default: Date.now() },                              // 会诊日期
  departmentId: { type:String },                                                // 医生所在部门
  doctorName: { type:String, require: true },                                   // 医生名称
  symptoms: { type:String, default: '' },                                       // 症状描述
  drugsage: { type:Array<string>, default: [] },                                // 开了什么药
  remark: { type:String, default: '' },                                         // 备注
  time: { type:Date, default: new Date() },                                     // 就诊记录创建日期
  signature: {type: String, require: true, default:''}
})

// 送药表
const DrugDeliverySchema = new Schema({
  userId: { type:String, require: true },                                       // 用户ID
  name: { type:String, require: true },                                         // 收件人名字
  phone: { type:String, require: true },                                        // 收件人电话
  period: { type:String, require: true },                                         // 送件时间
  quantities: { type:Number, default: 1 },                                      // 药品数量
  subject: { type:String, require: true },                                      // 药品名称
  status: { type:String, enum: DELIVERY, default: DELIVERY.Undelivered },       // 配送状态
  other: { type:String, default: '' },                                          // 备注
  time: { type:Date, default: new Date() },                                     // 创建时间
})

// 推送信息
const PushInformationSchema = new Schema<pushInfoModelType>({
  title: String,                                                                // 标题
  link: String,                                                                 // 网页链接
  coverLink: String,                                                            // 背景图
})

let UserModel = db.model('User', UserSchema)
let DepartmentModel = db.model('Department', DepartmentSchema)
let TokenModel = db.model('Token', TokenSchema)
let DoctorModel = db.model('Doctor', DoctorSchema)
let DoctorAvailableTimeModel = db.model('DoctorAvailableTime', DoctorAvailableTimeSchema)
let DoctorAvailableWeekModel = db.model('DoctorAvailableWeek', DoctorAvailableWeekSchema)
let DoctorPictureModel = db.model('DoctorPicture', DoctorPictureSchema)
let InquiryModel = db.model('Inquiries', InquirySchema)
let VisitRecordModel = db.model('VisitRecord', VisitRecordSchema)
let DrugDeliveryModel = db.model('DrugDelivery', DrugDeliverySchema)
let PushInformationModel = db.model('PushInformation', PushInformationSchema)

export {
  UserModel, DepartmentModel, TokenModel, DoctorModel,
  DoctorAvailableTimeModel, DoctorAvailableWeekModel, DoctorPictureModel, 
  InquiryModel, VisitRecordModel, 
  DrugDeliveryModel, PushInformationModel
}