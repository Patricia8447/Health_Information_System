import express from "express";
import bodyParser from "body-parser";
import { port, Token } from './config/default'
import router from "./route";
import responseInfo from "./config/responseInfo";

const app = express()
const ExpressJwt = require('express-jwt')

// 解决前后端分离出现的跨域问题
app.all('*', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Access-Control-Allow-Headers, 可根据浏览器的F12查看，把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

// 解析前端请求体数据
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

// 获取静态路径
app.use(express.static(__dirname + '/public'))

// 全局token验证(unless 名单除外)
app.use(ExpressJwt({
  secret: Token.key,
  algorithms: ['HS256']
}).unless({ path: Token.unCheck }))

app.use((err:express.Errback, req:express.Request, res:express.Response, next:express.NextFunction) => {
  let errArray = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError']
  if(err.name === 'UnauthorizedError'){
    res.send(responseInfo.loginOverTime('暂未登录,请先登录'))
  }else if(errArray.includes(err.name)){
    res.send(responseInfo.loginOverTime())
  }else{
    next()
  }
})

// 路由
app.use('/', router)


app.use('*', (req:express.Request, res:express.Response) => {
  res.render('', { status: 404, title: 'Not find' })
})
app.listen(port, () => {
  console.log('服务器启动成功,对应端口号为:' + port);
})