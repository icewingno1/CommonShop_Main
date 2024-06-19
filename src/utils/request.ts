import axios from 'axios'
import { showFailToast } from 'vant'
import { useUserStore } from '@/stores/user'

const instance = axios.create({
  baseURL: '//127.0.0.1',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = token
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(function (res) {
  if (typeof res.data !== 'object') {
    showFailToast('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) showFailToast(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data
})

export default instance
