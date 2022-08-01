import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/Classification',
    component: () => import('../views/Classification/Classification.vue')
  },
  {
    path: '/Shopcart',
    component: () => import('../views/Shopcart/Shopcart.vue')
  },
  {
    path: '/Profile',
    component: () => import('../views/Profile/Profile.vue')
  },
  {
    path: '/Goods/:iid',
    component: () => import('../views/Goods/Goods.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
