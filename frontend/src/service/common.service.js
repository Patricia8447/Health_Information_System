import request from '@/utils/request'

export default {
  // 查看所有部门
  departmentAll: (data) => {
    return request.post('/common/department/all', data)
  },

  getAllDoctor: (data) => {
    return request.post('/common/doctor/all', data)
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

  getPushInfoList: (data) => {
    return request.post('/common/info/list', data)
  },
}