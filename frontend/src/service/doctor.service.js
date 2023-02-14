import request from '@/utils/request'

export default {
// 取消申请医生
doctorCancel: (data) => {
  return request.post('/doctor/cancel',data)
},
// 医生写就诊记录
doctorWirteVisitRecord: (data) => {
  return request.post('/doctor/record/wirst',data)
},

getInquiryList: (data) => {
  return request.post('/doctor/inquiry/list',data)
},

getTimeList: (data) => {
  return request.post('/doctor/time/list',data)
},

getDateList: (data) => {
  return request.post('/doctor/date/list',data)
},

}