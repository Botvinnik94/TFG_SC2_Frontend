import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import { AuthServiceFactory } from '@/auth/AuthServiceFactory'
import { ProviderType } from '@/auth/ProviderType'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const authService = AuthServiceFactory.getAuthService(ProviderType.Firebase);
    console.log('Auth guard')
    console.log(await authService.isAuthorized())
    if(!await authService.isAuthorized()){
      console.log('Forbidden')
      next({
        path: '/login'
      })
    }
    else{
      console.log('Authorized')
      next()
    }
  }
  else{
    console.log('Auth not needed')
    next()
  }
})

export default router
