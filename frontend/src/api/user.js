import request from './request'

function registe(params){
  return request.post('/user/signUp', params)
}

let userServe = {
  registe
}

export default userServe