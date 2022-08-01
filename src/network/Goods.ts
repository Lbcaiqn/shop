import {AxiosRequestConfig,AxiosResponse} from 'axios'
import instance from './index'

export function GoodsRequestDetail(iid: any){
  return instance({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function GoodsRequestRecommend(){
  return instance({
    url:'/recommend'
  })
}