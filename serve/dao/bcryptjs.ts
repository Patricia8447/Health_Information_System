const bcrypt = require('bcryptjs')

/**
 * 生成hash密码
 * @param {String} e 输入的密码
 * @returns {String} 生成的hash密码
 */
function encryption(e:string) {
  // 生产随机的10位salt
  let salt = bcrypt.genSaltSync(10)
  // 生产hash密码
  let hash = bcrypt.hashSync(e, salt);
  return hash;
}

/**
 * 解密数据库对应的密码
 * @param {String} e 前端返回的密码
 * @param {String} hash 数据库的加密后的密码
 * @returns {Boolean} 解密后的数据
 */
function verification(e:String, hash:String){
  let verif = bcrypt.compareSync(e, hash);
  return verif
}

export { encryption, verification }