import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register.vue')

  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/history/History.vue')

  },
  {
    path: '/detail/:id',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/detail/Detail.vue')

  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Home.vue')
  },
  {
    path: '/userDetail',
    name: 'UserDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/userDetailToast.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/search/Search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
