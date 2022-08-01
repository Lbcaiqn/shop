import {AxiosRequestConfig,AxiosResponse} from 'axios'
import instance from './index'

export function HomeRequestMultidata(): Promise<AxiosResponse>{
  return instance({
    url: '/Home/multidata'
  })
}

export function HomeRequestGoods(type: string, page: number){
  return instance({
    url: '/Home/data',
    params: {
      type,
      page
    }
  })
}