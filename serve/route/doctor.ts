import { Request, Response, Router, NextFunction } from "express";
import { ROLE } from "../config/default";
import responseInfo from "../config/responseInfo";
import { UserModel } from "../model/dbmodel";
import doctorServe from "../server/doctor";

const doctorRouter = Router()

// doctor路由全局拦截
doctorRouter.use((req:Request, res:Response, next:NextFunction) => {
  UserModel.findOne({_id: req.body.id}).then((result:any) => {
    if(result.power && result.power !== ROLE.Docotr) { 
      res.send(responseInfo.roleException())
      return;
    }
    next()
  })
})

doctorRouter.post('/cancel', (req:Request, res:Response) => {
  doctorServe.cancelDoctorRole(req, res)
})

doctorRouter.post('/inquiry/list', (req:Request, res:Response) => {
  doctorServe.getInquiryList(req, res)
})

doctorRouter.post('/time/list', (req:Request, res:Response) => {
  doctorServe.getTimeList(req, res)
})

doctorRouter.post('/date/list', (req:Request, res:Response) => {
  doctorServe.getDateList(req, res)
})

doctorRouter.post('/record/wirst', (req:Request, res:Response) => {
  doctorServe.wirteVisitRecord(req, res)
})

doctorRouter.post('/record/list', (req:Request, res:Response) => {
  doctorServe.getVisitRecordList(req, res)
})

export default doctorRouter