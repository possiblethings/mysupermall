import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
    mode:'history'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    mode: 'history',
    params:{
      type,
      page
    }
  })

}
