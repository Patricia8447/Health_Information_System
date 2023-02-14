import request from '@/utils/request'

export default {
    // 注册 已完成
    signUp: (data) => {
        return request.post('/user/signUp', data)
    },
    // 登录 已完成
    login: (data) => {
        return request.post('/user/login', data)
    },
    // 忘记密码的邮件 已完成
    sendCheckMail: (data) => {
        return request.post('/user/sendCheckMail', data)
    },
    // 重置密码 已完成
    resetPass: (data) => {
        return request.post('/user/resetPass', data)
    },
    // 更新个人信息 已完成
    resaveUserInfo: (data) => {
        return request.post('/user/resetUserInfo', data)
    },
    // 更新医生信息 已完成
    resaveDoctorInfo: (data) => {
        return request.post('/user/resetDoctorInfo', data)
    },
    // 申请成为医生 已完成
    toBeDoctor: (data) => {
        return request.post('/user/toBeDoctor', data)
    },

    //获取用户信息
    getUserInfo: (data) => {
        return request.post('/user/info', data)
    },

    getOneInquiry: (data) => {
        return request.post('/user/getOneInquiry', data)
    },
}