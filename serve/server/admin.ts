import { Request, Response } from 'express'
import { ObjectSimpleShallowCopy } from '../config/default';
import {
  adminApprovalDoctorCancelStatusType, changeDoctorStatusType, pushInfoType,
  updateDepartmentNameType, getOneDoctorType, changeInquiryStatusType, getaDoctorType
} from '../config/type';
import FunctionSet from "../dao/FunctionSet";

function addDepartment(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.addDepartment(data, res)
}

function updateDepartmentName(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.updateDepartmentName((data as updateDepartmentNameType), res)
}

function approvalDoctorStatus(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.adminApprovalDoctorStatus((data as changeDoctorStatusType), res)
}

function rejectDoctorStatus(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.adminRejectDoctorStatus((data as changeDoctorStatusType), res)
}

function adminInactiveDoctorStatus(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.adminInactiveDoctorStatus((data as changeDoctorStatusType), res)
}

function approvalDoctorCancelStatus(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.adminApprovalDoctorCancelStatus((data as adminApprovalDoctorCancelStatusType), res)
}

function getOneDoctor(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getOneDoctor((data as getOneDoctorType), res)
}

function getaDoctor(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getaDoctor((data as getaDoctorType), res)
}

function addPushInfo(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.addPushInfo((data as any), res)
}

function updataPushInfo(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.updataPushInfo((data as any), res)
}

function deletePushInfo(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.deletePushInfo((data as any), res)
}

function findDoc(req: Request, res: Response) {
  let data: Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.findDoc((data as any), res)
}

function changeInquiryStatus(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.changeInquiryStatus((data as changeInquiryStatusType), res)
}

function getaDoctorbyUserId(req: Request, res: Response) {
  let data: Record<string, string | boolean> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getaDoctorbyUserId((data as getaDoctorType), res)
}

let adminServe = {
  addDepartment, updateDepartmentName, approvalDoctorStatus, approvalDoctorCancelStatus,
  addPushInfo, updataPushInfo, deletePushInfo, getOneDoctor, rejectDoctorStatus, findDoc
  , adminInactiveDoctorStatus, changeInquiryStatus, getaDoctor, getaDoctorbyUserId
}

export default adminServe