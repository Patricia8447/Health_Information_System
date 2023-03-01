import request from '@/utils/request'

export default {
  // 添加部门
  departmentAdd: (data) => {
    return request.post('/admin/department/add', data)
  },
  // 修改部门名称
  departmentUpdata: (data) => {
    return request.post('/admin/department/updata', data)
  },
  // 申请医生审批 
  doctorApply: (data) => {
    return request.post('/admin/doctor/apply/approval', data)
  },
  // 取消医生审批
  doctorCancel: (data) => {
    return request.post('/admin/doctor/cancel/approval', data)
  },
  // 审批医生资格
  ApprovalDoctorStatus: (data) => {
    console.log(data)
    return request.post('/admin/doctor/apply/approval', data)
  },

  RejectDoctorStatus: (data) => {
    console.log(data)
    return request.post('/admin/doctor/apply/reject', data)
  },

  InactiveDoctorStatus: (data) => {
    console.log(data)
    return request.post('/admin/doctor/apply/inactive', data)
  },

  getOneDoctor: (data) => {
    return request.post('/admin/doctor/one', data)
  },

  getaDoctor: (data) => {
    return request.post('/admin/doctor/a', data)
  },

  addPushInfo: (data) => {
    console.log(data)
    return request.post('/admin/info/add', data)
  },

  updataPushInfo: (data) => {
    console.log(data)
    return request.post('/admin/info/updata', data)
  },

  deletePushInfo: (data) => {
    console.log(data)
    return request.post('/admin/info/delete', data)
  },

  findDoc: (data) => {
    console.log(data)
    return request.post('/admin/doctor/finddoc', data)
  },

  changeInquiryStatus: (data) => {
    console.log(data)
    return request.post('/admin/inquiry/changestatus', data)
  },

}