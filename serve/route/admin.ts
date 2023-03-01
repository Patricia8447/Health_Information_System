import { Request, Response, Router, NextFunction } from "express";
import { ROLE } from "../config/default";
import responseInfo from "../config/responseInfo";
import { UserModel } from "../model/dbmodel";
import adminServe from "../server/admin";

const adminRouter = Router()

// admin路由全局拦截
adminRouter.use((req: Request, res: Response, next: NextFunction) => {
  UserModel.findOne({ _id: req.body.id }).then((result: any) => {
    if (result.power && result.power !== ROLE.Admin) {
      res.send(responseInfo.roleException())
      return;
    }
    next()
  })
})

/* department start */
adminRouter.post('/department/add', (req: Request, res: Response) => {
  adminServe.addDepartment(req, res)
})

adminRouter.post('/department/updata', (req: Request, res: Response) => {
  adminServe.updateDepartmentName(req, res)
})
/* department end */

/* doctor start */
adminRouter.post('/doctor/apply/approval', (req: Request, res: Response) => {
  adminServe.approvalDoctorStatus(req, res)
})

adminRouter.post('/doctor/apply/reject', (req: Request, res: Response) => {
  adminServe.rejectDoctorStatus(req, res)
})

adminRouter.post('/doctor/apply/inactive', (req: Request, res: Response) => {
  adminServe.adminInactiveDoctorStatus(req, res)
})

adminRouter.post('/doctor/cancel/approval', (req: Request, res: Response) => {
  adminServe.approvalDoctorCancelStatus(req, res)
})
/* doctor end */

/* info start */
adminRouter.post('/info/add', (req: Request, res: Response) => {
  adminServe.addPushInfo(req, res)
})

adminRouter.post('/info/updata', (req: Request, res: Response) => {
  adminServe.updataPushInfo(req, res)
})

adminRouter.post('/info/delete', (req: Request, res: Response) => {
  adminServe.deletePushInfo(req, res)
})
/* info end */

adminRouter.post('/doctor/one', (req: Request, res: Response) => {
  adminServe.getOneDoctor(req, res)
})

adminRouter.post('/doctor/a', (req: Request, res: Response) => {
  adminServe.getaDoctor(req, res)
})

adminRouter.post('/doctor/finddoc', (req: Request, res: Response) => {
  adminServe.findDoc(req, res)
})

adminRouter.post('/inquiry/changestatus', (req: Request, res: Response) => {
  adminServe.changeInquiryStatus(req, res)
})

export default adminRouter
