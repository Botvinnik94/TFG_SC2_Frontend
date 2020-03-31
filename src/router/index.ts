import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import { ProviderType } from '@/auth/ProviderType'
import { AuthServiceFactory } from '@/auth/AuthServiceFactory'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/bot/:id',
    name: 'Bot',
    component: () => import(/* webpackChunkName: "about" */ '../views/Bot.vue')
  },
  {
    path: '/bot-creation',
    name: "BotCreation",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BotCreation.vue')
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
    console.log('Auth guard')
    if(!await store.getters.authService?.isAuthorized()){
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
