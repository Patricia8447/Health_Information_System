import { Request, Response } from 'express'
import { ObjectSimpleShallowCopy } from '../config/default';
import { createDistributionType, judgeDoctorIsFreeType, personAskDoctorType, updataDistributionType, doctorWirteVisitRecordType } from '../config/type';
import FunctionSet from "../dao/FunctionSet";

function getAllDepartment(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getAllDepartment(data, res)
}

function getAllDoctor(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getAllDoctor(data, res)
}

function getApprovedDoctor(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getApprovedDoctor(data, res)
}

function askDoctor(req:Request, res:Response){
  let data:Record<string, string|Date> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.personAskDoctor((data as personAskDoctorType), res)
}

function getVisitRecordList(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  data.userId = data.id
  delete data.id
  FunctionSet.getVisitRecordList(data, res)
}

function getVisitRecordList2(req:Request, res:Response){
  let data: Record<string, string | Array<string>> = ObjectSimpleShallowCopy(req.body)
  data.doctorId = data.id
  delete data.id
  FunctionSet.getVisitRecordList2(data as doctorWirteVisitRecordType, res)
}

function createDistribution(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.createDistribution(data as createDistributionType, res)
}

function updataDistribution(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.updataDistribution(data as updataDistributionType, res)
}

function judgeDoctorIsFree(req:Request, res:Response){
  let data:Record<string, any> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.judgeDoctorIsFree(data as judgeDoctorIsFreeType, res)
}

function getPushInfoList(req:Request, res:Response){
  let data:Record<string, string> = ObjectSimpleShallowCopy(req.body)
  FunctionSet.getPushInfoList(data, res)
}


let commonServe = {
  getAllDepartment, getAllDoctor, askDoctor, getVisitRecordList, 
  createDistribution, updataDistribution,judgeDoctorIsFree, 
  getPushInfoList, getVisitRecordList2,
  getApprovedDoctor
}

export default commonServe