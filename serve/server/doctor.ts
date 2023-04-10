import { Request, Response } from 'express'
import { ObjectSimpleShallowCopy } from '../config/default'
import { doctorWirteVisitRecordType } from '../config/type'
import FunctionSet from '../dao/FunctionSet'

function cancelDoctorRole(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.doctorCancelToBeDoctor(data, res)
}

function getInquiryList(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getInquiryList(data, res)
}

function wirteVisitRecord(req: Request, res: Response) {
  let data: Record<string, string | Array<string>> = ObjectSimpleShallowCopy(req.body)
  data.doctorId = data.id
  delete data.id
  FunctionSet.doctorWirteVisitRecord(data as doctorWirteVisitRecordType, res)
}

function clickStart(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.clickStart(data, res)
}

function getVisitRecordList(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  data.doctorId = data.id
  delete data.id
  FunctionSet.getVisitRecordList(data, res)
}

function getTimeList(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getTimeList(data, res)
}

function getDateList(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getDateList(data, res)
}

let doctorServe = {
  cancelDoctorRole, getInquiryList, wirteVisitRecord, 
  getVisitRecordList, getTimeList, getDateList,
  clickStart
}

export default doctorServe