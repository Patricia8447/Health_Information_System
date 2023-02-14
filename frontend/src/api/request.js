import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/api',
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
})

instance.interceptors.request.use(config => {
  // 设置对应的token
  config.headers.Authorization = 'token'
  return Promise.resolve(config)
}, err => {
  Promise.reject(err)
})

instance.interceptors.response.use(res => {
  // 处理各种状态码
  if(res.status === 200) return Promise.resolve(res.data)
  else return Promise.reject(res)
}, err => {
  Promise.reject(err)
})

export default instance