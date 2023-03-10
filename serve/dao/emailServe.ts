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
function signUpEmail(email: string) {
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: 'Welcome to My System',
    html: '<span>Welcome to join us</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err: any, msg: string) => {
    if (err) {
      console.error(err);
      throw new Error(err)
    } else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}

/**
 * 发送邮箱验证码
 * @param { string } email 目标邮箱
 * @param { string } code 对应的验证码
 */
function checkCodeEmail(email: string, code: string) {
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: 'My System - Retrieve password verification email',
    html: '<span>' + code + '</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err: any, msg: string) => {
    if (err) {
      console.error(err);
      throw new Error(err)
    } else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}

function checkStatusEmail(email: string) {
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: 'Appointment Status Reminder',
    html: '<span>A change has been detected in your appointment. Please log in to your account to check the current appointment status.</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err: any, msg: string) => {
    if (err) {
      console.error(err);
      throw new Error(err)
    } else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}

function allertDoctorStatusEmail(email: string) {
  //  发送信息内容
  let options = {
    from: sendEmailData[sendEmailType].user,
    to: email,
    subject: 'Change of Account Status',
    html: '<span>A change has been detected in your account. Please log in to your account to check the current status. Please check all affected patient appointments promptly. If you have any questions, please contact the manager at admin@admin.com</span>',
  }
  // 发送邮件
  transporter.sendMail(options, (err: any, msg: string) => {
    if (err) {
      console.error(err);
      throw new Error(err)
    } else {
      console.log('邮箱发送成功! -> ' + options.to);
    }
  })
}
export {
  signUpEmail, checkCodeEmail, checkStatusEmail, allertDoctorStatusEmail
}