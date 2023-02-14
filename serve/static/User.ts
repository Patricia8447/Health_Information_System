import { encryption, verification } from '../dao/bcryptjs'

class User{
  constructor(
    public name: string,
    public password: string,
    public email: string,
    public phone: string,
    public role: string
  ){}
  // 返回加密后的User
  public encrypt(){
    return new User(
      this.name, 
      encryption(this.password), 
      this.email, 
      this.phone,
      this.role
    )
  }
  // 校验密码
  public static check(pass:String, encryptPass:String){
    return verification(pass, encryptPass)
  }
  // 加密密码
  public static encryptPass(pass:string):string{
    return encryption(pass)
  }
}

export default User