import { Request, Response } from "express"
import path from "path"
import { ObjectSimpleShallowCopy } from "../config/default"
import responseInfo from "../config/responseInfo"
import mkdirs from "../dao/mkdir"

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req: Request, file: typeof multer.file, cb: Function) => {
    mkdirs('../public/img', (err: Error) => { console.log(err) })
    cb(null, path.join(__dirname, '../public/img'))
  },
  filename: (req: Request, file: typeof multer.file, cb: Function) => {
    let name = Date.now()
    // let name =file.originalname
    let type = (file.originalname as String).replace(/.+\./, '.')
    // 加上时间戳
    console.log("name: " + file.originalname)
    cb(null, name + type)
  }
})
const upload = multer({ storage })

function uploadImg(req: Request, res: Response) {
  res.send(responseInfo.success((req as any).file.filename))
  //res.sendFile('')
}

let uploadServe = {
  upload, uploadImg
}

export default uploadServe