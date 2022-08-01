import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from 'axios'

let instance: AxiosInstance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/hy66',
  timeout: 1000 * 60
})
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})
instance.interceptors.response.use((res: AxiosResponse) => {
  return res
})

export default instance