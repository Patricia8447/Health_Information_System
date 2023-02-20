import { Request, Response, Router } from "express";
import commonServe from "../server/common";

const commonRouter = Router()

commonRouter.post('/department/all', (req:Request, res:Response) => {
  commonServe.getAllDepartment(req, res)
})

commonRouter.post('/doctor/all', (req:Request, res:Response) => {
  commonServe.getAllDoctor(req, res)
})

commonRouter.post('/doctor/approveddoctor', (req:Request, res:Response) => {
  commonServe.getApprovedDoctor(req, res)
})
commonRouter.post('/doctor/ask', (req:Request, res:Response) => {
  commonServe.askDoctor(req, res)
})

commonRouter.post('/record/list', (req:Request, res:Response) => {
  commonServe.getVisitRecordList(req, res)
})

commonRouter.post('/record2/list', (req:Request, res:Response) => {
  commonServe.getVisitRecordList2(req, res)
})

commonRouter.post('/doctor/judge', (req:Request, res:Response) => {
  commonServe.judgeDoctorIsFree(req, res)
})

commonRouter.post('/prescription/add', (req:Request, res:Response) => {
  commonServe.createDistribution(req, res)
})

commonRouter.post('/prescription/updata', (req:Request, res:Response) => {
  commonServe.updataDistribution(req, res)
})

commonRouter.post('/info/list', (req:Request, res:Response) => {
  commonServe.getPushInfoList(req, res)
})


export default commonRouter