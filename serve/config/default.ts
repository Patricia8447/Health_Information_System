// 端口号
export let port = 3005

// 性别枚举
export enum GENDER { Male = 'male', Female = 'female', Neutral = 'neutral' }

// 审核状态
export enum AUDITSTATUS { Reviewing = 'Reviewing', Approved = 'Approved', NoPass = 'Not Pass', Canceling = 'Canceling', Canceled = 'Canceled' }

// 数据库地址 
export let mongoUrl = 'mongodb://localhost:27017'
// 权限枚举
export enum ROLE {
  Normal = 'NORMAL',
  Docotr = 'DOCTOR',
  Admin = 'ADMIN'
}

// 配送状态
export enum DELIVERY { Undelivered = 'Undelivered', Delivering = 'Delivering', Delivered = 'Delivered' }

export enum APPOINTMENT{ Not='Not yet start', End='finished', Void='void', Ongoing='on-going' }
// 发送注册成功的邮箱数据
export let sendEmailData = {
  '163': {
    user: 'patricia8447@163.com', // 发送邮箱
    pass: 'JFVAPYCXJFWHYPYB', // 获取的STMP授权码
  }
}

export let Token = {
  key: 'Patricia8447',                   // 密钥
  time: 60 * 60 * 1000 * 24,               // 过期时间
  header: 'Authorization',            // 请求头参数
  unCheck: [                          // 不用校验的路由
    /^.*\/login/,
    /^.*\/signUp/,
    /^.*\/img/,
    /^.*\/sendCheckMail/,
    /^.*\/resetPass/,
  ],
}

// 随机生成的验证码
export function getRandOmCode(): string {
  let chatArr: Array<number> = []
  let str = ''
  for (let i = 48; i < 58; i++) chatArr.push(i)   // 0 - 9
  for (let i = 65; i < 91; i++) chatArr.push(i)   // A - Z
  for (let i = 97; i < 123; i++) chatArr.push(i)  // a - z
  for (let i = 0; i < 6; i++) str += String.fromCharCode(chatArr[Math.floor(Math.random() * 62)])
  return str
}

// 重新设置密码对应的验证码有效时间
export let resetPassCodeTime = 2 * 60 * 1000

/**
 * Object简便浅拷贝
 * @param source 源Object
 * @returns 拷贝后的数据
 */
export function ObjectSimpleShallowCopy(source: Record<string, any>): Record<string, string> {
  let target: Record<string, any> = {}
  Object.entries(source).forEach(([key, value]) => { target[key == '_id' ? 'id' : key] = value })
  return target
}