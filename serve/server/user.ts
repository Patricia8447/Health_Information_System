import { ObjectSimpleShallowCopy } from "../config/default";
import { applyToBeDoctorType, availableWeekType, loginDataType, resetPassDatType, resetUserInfoType, resetDoctorInfoType, sendCheckDataType, updateinqueryType } from "../config/type";
import { Request, Response } from 'express'
import FunctionSet from "../dao/FunctionSet";

function signUp(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.newUser(data as any, res)
}

function signIn(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.login(data as loginDataType, res)
}

function sendCheckEmail(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.sendCheckMail(data as sendCheckDataType, res)
}

function resetPass(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.resavePassword(data as resetPassDatType, res)
}

function resetUserInfo(req:Request, res:Response){
  let data:Record<string, string|Date> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.resaveUserInfo(data as resetUserInfoType, res)
}

function resetDoctorInfo(req:Request, res:Response){
  let data:Record<string, string|Date> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.resaveDoctorInfo(data as resetDoctorInfoType, res)
}

function applyToBeDoctor(req:Request, res:Response){
  let data:Record<string, string|Array<string>|availableWeekType> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.applyToBeDoctor((data as applyToBeDoctorType), res)
}

function getUserinfo(req:Request, res:Response){
  let data:Record<string, any> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getUserInfo((data as applyToBeDoctorType), res)
}

// function getOneInquiry(req:Request, res:Response){
//   let data:Record<string, any> = ObjectSimpleShallowCopy(req.body)
//   FunctionSet.getOneInquiry((data as updateinqueryType), res)
// }

let userServe = {
  signUp, signIn, sendCheckEmail, resetPass, resetUserInfo, resetDoctorInfo, applyToBeDoctor, getUserinfo
}

export default userServe