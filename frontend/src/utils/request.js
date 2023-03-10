import axios from 'axios'
import { baseUrlApi } from '@/utils/baseUrl'

// 创建axios实例
const request = axios.create({
	baseURL: baseUrlApi,
	timeout: 5000
})
// 配置响应拦截器
request.interceptors.response.use(
	// (response) => {
	// 	if (response.data.code === 1002 || response.data.code === 1001) {
	// 		alert('登录过期')
	// 		// 登录过期 对应的处理逻辑 需要回到login页面
	// 		// 登录过期 需要清掉本地缓存中的token
	// 		this.$router.replace("/login");
	// 		localStorage.removeItem("user_token");
	// 	}
	// }
	
	// (response) => {
	// 		// 如果请求报错
	// 		if (response.data.code != 10000) {
	// 			console.log(response.data.data);
	// 			// uni.showModal({
	// 			// 	title:'温馨提示',
	// 			// 	content:response.data.data
	// 			// })
	// 		}else{
	// 			//只将请求结果的data字段返回
	// 			return response.data.data
	// 		}
	// 	},
	// 	(err) => {
	// 		//发生网络错误后会走到这里
	// 		return Promise.resolve("网络请求：ERROR！")
	// 	}
)
// 配置请求拦截器
request.interceptors.request.use((request) => {
	if (localStorage.getItem("user")) {
		let userInfo = JSON.parse(localStorage.getItem("user"));
		request.headers["authorization"] = 'Bearer ' + userInfo.token
	}
	// if(request.url.indexOf('/upload') !== -1){
	// 	let userInfo = JSON.parse(localStorage.getItem("userInfo"));
	// 	console.log("上传");
	// 	request.headers = {
	// 		"authorization":'Bearer '+ userInfo.token,
	// 		"Content-Type": "application/x-www-form-urlencoded"
	// 	}
	// }
	return request;
})

export default request

