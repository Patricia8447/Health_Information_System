const jsonWebToken = require('jsonwebtoken'); 
import { Token } from '../config/default'
import { TokenModel } from '../model/dbmodel';

function createToken(id:string){
  return new Promise((resolve, reject) => {
    TokenModel.findOne({userId: id}).then((result:any) => {
      if(!result){    // 没有检索到数据
        let token = jsonWebToken.sign({ id: id, time: Date.now() + Token.time }, Token.key, { expiresIn: Token.time })
        // 保存token
        new TokenModel({userId: id, token, expirationTime: Date.now() + Token.time}).save()
        .then(() => resolve(token)).catch(err => {throw err})
      }else {
        if(result.expirationTime - Date.now() < 0){       // token过期
          let token = jsonWebToken.sign({ id: id, time: Date.now() + Token.time }, Token.key, { expiresIn: Token.time })
          // 更新token
          TokenModel.updateOne({userId: id}, {token, expirationTime: Date.now() + Token.time})
          .then(() => resolve(result.token)).catch(err => {throw err})
        }else{
          TokenModel.updateOne({userId: id}, {expirationTime: Date.now() + Token.time})
          resolve(result.token)
        }
      }
    }).catch((err:Error) => { reject(err) })
  })
  
}

function verifyToken(token:string){
  return new Promise((resolve, reject) => {
    jsonWebToken.verify(token, Token.key, (err:any, result:any) => {
      if(err) reject(err)
      else resolve(result)
    })
  })
}

export{
  createToken, verifyToken
}