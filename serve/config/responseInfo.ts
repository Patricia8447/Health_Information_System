function Exception(code:number, msg:string, e:string){
  // console.log(msg + ':' + e);
  return new MyException(code, e?e:msg)
}

class MyException{
  constructor(
    public code:number, 
    public info: string
  ){}
}

export default {
  // 请求成功
  success:(e:any) => {
    return {code: 1, info: e}
  },
  // 请求异常
  requestException: (e?:any) => {
    return Exception(-1, 'Request exception', e)
  },
  // 注册异常
  registerException: (e?:any) => {
    return Exception(1000, 'Registration exception', e);
  },
  // 登录异常
  loginException: (e?:any) => {
    return Exception(1001, 'Login exception', e);
  },
  // 登录过期
  loginOverTime: (e?:any) => {
    return Exception(1002, 'Login expired', e);
  },
  // 查询异常
  searchException: (e?:any) => {
    return Exception(1003, 'Query exception', e);
  },
  // 获取异常
  getException: (e?:any) => {
    return Exception(1004, 'Data acquisition exception', e);
  },
  // 修改异常
  updataException: (e?:any) => {
    return Exception(1005, 'Modify data exception', e)
  },
  // 邮箱发送异常
  emailException: (e?:any) => {
    return Exception(1006, 'Email sending exception', e)
  },
  // 验证异常
  checkException: (e?:any) => {
    return Exception(1007, 'Verification code error', e)
  },
  // 权限不足
  roleException: (e?:any) => {
    return Exception(1008, 'Lack of authority', e)
  },
  // 申请异常
  applyException: (e?:any) => {
    return Exception(1009, 'Application exception', e)
    // return e
  }
}