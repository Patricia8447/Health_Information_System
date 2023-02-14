import request from '@/utils/request'

export default {
  // 上传
  uploadImg: (data) => {
  //  console.log(request.post('/upload/img', data));
    return request.post('/upload/img', data)
  },

}