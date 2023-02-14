import fs from 'fs'
import path from 'path'

function mkdirs(pathName:string, callback:Function){
  // 判断绝对路径，避免不必要的BUG
  pathName = path.isAbsolute(pathName) ? pathName : path.join(__dirname, pathName)
  // 获取相对路径
  pathName = path.relative(__dirname, pathName)
  let pre = ''
  pathName.split(path.sep).forEach((floder:string) => {
    try {
      let _stat = fs.statSync(path.join(__dirname, pre, floder))
      let hasMkdir = _stat && _stat.isDirectory()
      // 没有异常，则代表文件已创建
      if(hasMkdir) callback
    } catch (error) {
      // 文件不存在则创建文件
      try {
        // 避免父文件还没有创建的时候先创建子文件所出现的bug，这里选择同步创建文件
        fs.mkdirSync(path.join(__dirname, pre, floder))
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    }
    // 路径拼接
    pre = path.join(pre, floder)
  })
}

export default mkdirs