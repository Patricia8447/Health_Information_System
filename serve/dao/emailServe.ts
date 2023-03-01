import { sendEmailData } from '../config/default'

const nodemailer = require('nodemailer')
const sendEmailType = '163'

const transporter = nodemailer.createTransport({
  service: sendEmailType,
  auth: {
    user: sendEmailData[sendEmailType].user,
    pass: sendEmailData[sendEmailType].pass
  }
})

/**
 * 发送注册成功邮箱
 * @param { string } email 目标邮箱
 */
function signUpEmail(email:string){
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: '欢迎来到我的系统',
    html: '<span>欢迎您的加入</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err:any, msg:string) => {
    if(err){
      console.error(err);
      throw new Error(err)
    }else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}

/**
 * 发送邮箱验证码
 * @param { string } email 目标邮箱
 * @param { string } code 对应的验证码
 */
function checkCodeEmail(email:string, code:string){
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: '我的系统找回密码验证邮箱',
    html: '<span>' + code + '</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err:any, msg:string) => {
    if(err){
      console.error(err);
      throw new Error(err)
    }else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}

function checkStatusEmail(email:string){
 //  发送信息内容
 let options = {
  from: sendEmailData[sendEmailType].user,
  to: email,
  subject: '预约状态提醒',
  html: '<span>检测到您的预约有变化，请登入您的账户查看当前预约状态</span>',
}
// 发送邮件
transporter.sendMail(options, (err:any, msg:string) => {
  if(err){
    console.error(err);
    throw new Error(err)
  }else {
    console.log('邮箱发送成功! -> ' + options.to);
  }
})
}
export {
  signUpEmail, checkCodeEmail, checkStatusEmail
}