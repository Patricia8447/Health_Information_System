import { Request, Response, Router } from "express";
import userServe from "../server/user";

const userRouter = Router()

userRouter.post('/signUp', (req:Request, res:Response) => {
  userServe.signUp(req, res)
})

userRouter.post('/info', (req:Request, res:Response) => {
  userServe.getUserinfo(req, res)
})

userRouter.post('/login', (req:Request, res:Response) => {
  userServe.signIn(req, res)
})

userRouter.post('/sendCheckMail', (req:Request, res:Response) => {
  userServe.sendCheckEmail(req, res)
})

userRouter.post('/resetPass', (req:Request, res:Response) => {
  userServe.resetPass(req, res)
})

userRouter.post('/resetUserInfo', (req:Request, res:Response) => {
  userServe.resetUserInfo(req, res)
})

userRouter.post('/resetDoctorInfo', (req:Request, res:Response) => {
  userServe.resetDoctorInfo(req, res)
})

userRouter.post('/toBeDoctor', (req:Request, res:Response) => {
  userServe.applyToBeDoctor(req, res)
})

// userRouter.post('/getOneInquiry', (req:Request, res:Response) => {
//   userServe.getOneInquiry(req, res)
// })

export default userRouter