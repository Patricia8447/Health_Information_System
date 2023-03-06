type loginDataType = { username: string, password: string }

type sendCheckDataType = { id: string, email: string }

type checkCodeType = { code: string, time: Date }

type checkCodeDataType = { [key: string]: checkCodeType }

type resetPassDatType = { id: string, email: string, pass: string, againPass: string, code: string }

type resetUserInfoType = { id: string, name: string, email: string, address: string, allergy: string, birth: Date, gender: string, photo: string }

type resetDoctorInfoType = { id: string, photo: string, identity: string, hospitalName: string, name: string, hospitalLevel: string, hospitalAddress: string, job: string, strength: string, selfIntro: string, departmentId: string, gender: string }

type updateDepartmentNameType = { id: string, name: string, departId: string }

type availableWeekType = { Mon: boolean, Tues: boolean, Wed: boolean, Thurs: boolean, Fri: boolean, Sat: boolean, Sun: boolean }

type applyToBeDoctorType = {
  id: string, doctorName: string, gender: string, zoomlink: string, email: string, identity: string,
  hospitalName: string, hospitalLevel: string, hospitalAddress: string,
  departmentId: string, job: string, strength: string, selfIntro: string,
  availabletime: Array<string>, availableWeek: availableWeekType, identityFront: string,
  identityBack: string, certification: string, workCertificate: string, photo: string
}

type availableTimeType = { doctorId: string, startTime: string, endTime: string }

type changeDoctorStatusType = { id: string, userId: string, status: string }

type adminApprovalDoctorCancelStatusType = { id: string, userId: string, bool: boolean }

type getOneDoctorType = { id: string, phone: string, name: string, email: string, hospitalName: string, hospitalLevel: string, hospitalAddress: string, pos: string, job: string, slot: string, strength: string, status: string, selfIntro: string }

type getaDoctorType = { doctorId: string, doctorName: string, userId: string }

type personAskDoctorType = { id: string, userName: string, doctorName: string, doctorId: string, selfReport: string, allergyMedicine: string, appointmentTime: string, appointmentDate: string }

type doctorWirteVisitRecordType = { id: string, inquiryId: string, doctorId: string, userId: string, name: string, age: string, gender: string, consultDate: string, departmentId: string, doctorName: string, symptoms: string, drugsage: string, remark: string }

type createDistributionType = { id: string, name: string, phone: string, period: string, deliverDate: string, subject: string, status: string, other: string }

type updataDistributionType = { id: string, drugId: string, name: string, phone: string, period: string, deliverDate: string, subject: string, status: string, other: string }

type timeSlotType = { startTime: string, endTime: string }

type judgeDoctorIsFreeType = { doctorId: string, date: Date, time: timeSlotType }

interface pushInfoModelType { title: string, link: string, coverLink: string }

interface pushInfoType extends pushInfoModelType { id: string }

interface updatePushInfoType extends pushInfoType { infoId: string }

type inqueryType = {
  userId: string, doctorId: string, selfReport: string, allergyMedicine: string, appointmentTime: string, appointmentDate: Date,
  status: string, time: Date
}

type changeInquiryStatusType = { id: string, userId: string, doctorId: string, status: string }

interface updateinqueryType extends inqueryType { inqueryId: string }

type findDocType = { doctorId: string, identityFront: string, identityBack: string, certification: string, workCertificate: string }

export {
  loginDataType, sendCheckDataType, checkCodeDataType, checkCodeType, resetPassDatType,
  resetUserInfoType, updateDepartmentNameType, applyToBeDoctorType, availableWeekType,
  availableTimeType, changeDoctorStatusType, adminApprovalDoctorCancelStatusType, resetDoctorInfoType,
  getOneDoctorType, personAskDoctorType, doctorWirteVisitRecordType, createDistributionType,
  updataDistributionType, judgeDoctorIsFreeType, pushInfoModelType, pushInfoType,
  updatePushInfoType, inqueryType, updateinqueryType, findDocType,
  changeInquiryStatusType, getaDoctorType
}