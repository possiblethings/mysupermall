import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    //全局配置
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
    // config.data = qs.stringify(config.data)
    // console.log(config);

    // 2.比如config中的一些信息不符合服务器的要求
    // 3.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标
    // 4.某些网络请求(比如登录(token)), 必须携带一些特殊的信息

    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    //1.响应的成功拦截中，主要是对数据进行过滤。
    return res.data
  }, err => {
    //响应的失败拦截中，可以根据status判断报错的错误码，跳转到不同的错误提示页面
    console.log(err);
  })

  // 3.发送真正的网络请求,并返回一个promise
  return instance(config)
}
