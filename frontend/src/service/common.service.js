import request from '@/utils/request'

export default {
  // 查看所有部门
  departmentAll: (data) => {
    return request.post('/common/department/all', data)
  },

  getAllDoctor: (data) => {
    return request.post('/common/doctor/all', data)
  },

  getApprovedDoctor: (data) => {
    return request.post('/common/doctor/approveddoctor', data)
  },

  createDistribution: (data) => {
    return request.post('/common/prescription/add', data)
  },

  updataDistribution: (data) => {
    return request.post('/common/prescription/updata', data)
  },

  personAskDoctor: (data) => {
    return request.post('/common/doctor/ask', data)
  },

  getVisitRecordList: (data) => {
    return request.post('/common/record/list', data)
  },

  getVisitRecordList2: (data) => {
    return request.post('/common/record2/list', data)
  },

  getPushInfoList: (data) => {
    return request.post('/common/info/list', data)
  },

  judgeDoctorIsFree: (data) => {
    return request.post('/common/doctor/judge', data)
  },
}