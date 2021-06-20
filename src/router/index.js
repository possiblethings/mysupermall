import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载的方式导入路径,用到时才加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象router
const routes = [
  {//默认页面路径
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    // 动态路由
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

//导出router
export default router
