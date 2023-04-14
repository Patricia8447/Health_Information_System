import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import commonRouter from "./common";
import { Token } from "../config/default";
import { TokenModel } from "../model/dbmodel";
import responseInfo from "../config/responseInfo";
import uploadRouter from "./upload";
import doctorRouter from "./doctor";

const router = Router()

router.use((req:Request, res:Response, next:NextFunction) => {
  let path = req.path
  let token = req.headers.authorization?.split(' ')[1] as string
  if(!Token.unCheck.some((element:RegExp) => element.test(path))){
    TokenModel.findOne({ token }).then((result:any) => {
      if(result === null){ throw new Error('please login first') }
      if(result.expirationTime - Date.now() < 0){ 
        // 登录超时则清空对应的token,并抛出异常告知登录过期
        TokenModel.deleteMany({ token })
        throw new Error()
      }
      TokenModel.updateOne({ token }, { expirationTime: Date.now() + Token.time })
      // 解析出来对应的用户ID
      req.body.id = result.userId
      next()
    }).catch((err:Error) => res.send(responseInfo.loginOverTime(err)))
  }else next()
})

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/doctor', doctorRouter)
router.use('/common', commonRouter)
router.use('/upload', uploadRouter)

export default router