import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Mine from '../views/Mine.vue'
import SightList from '../views/sight/SightList.vue'
import SightDetail from '../views/sight/SightDetail.vue'
import SightInfo from '../views/sight/SightInfo.vue'
import SightComment from '../views/sight/SightComment.vue'
import SightImage from '../views/sight/SightImage.vue'
import AccountLogin from '../views/accounts/Login.vue'
import AccountRegister from '../views/accounts/Register.vue'
import OrderSubmit from '../views/order/Submit.vue'
import OrderPay from '../views/order/Pay.vue'
import OrderList from '../views/order/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  // 个人中心
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  // 景点列表
  {
    path: '/sight/list',
    name: 'SightList',
    component: SightList
  },
  // 景点详情
  {
    path: '/sight/detail/:id',
    name: 'SightDetail',
    component: SightDetail
  },
  // 景点介绍
  {
    path: '/sight/info/:id',
    name: 'SightInfo',
    component: SightInfo
  },
  // 评论列表
  {
    path: '/sight/comment/:id',
    name: 'SightComment',
    component: SightComment
  },
  // 景点下的图片
  {
    path: '/sight/image/:id',
    name: 'SightImage',
    component: SightImage
  },
  // 用户登陆
  {
    path: '/account/login',
    name: 'AccountLogin',
    component: AccountLogin
  },
  // 用户注册
  {
    path: '/account/register',
    name: 'AccountRegister',
    component: AccountRegister
  },
  // 提交订单
  {
    path: '/order/submit/:id',
    name: 'OrderSubmit',
    component: OrderSubmit
  },
  // 确认订单并支付
  {
    path: '/order/pay/:sn',
    name: 'OrderPay',
    component: OrderPay
  },
  // 我的订单列表
  {
    path: '/order/list/:status',
    name: 'OrderList',
    component: OrderList
  }
]

const router = new VueRouter({
  routes
})

export default router
