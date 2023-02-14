import { Request, Response, Router } from "express";
import uploadServe from "../server/upload";

const uploadRouter = Router()

uploadRouter.post('/img', uploadServe.upload.single('file'), (req:Request, res:Response) => {
  uploadServe.uploadImg(req, res)
})



export default uploadRouter