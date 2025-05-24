import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home_page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News_page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About_page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/devlog',
    name: 'Devlog',
    component: () => import('../views/DevlogPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/canlander',
    name: 'Milestone',
    component: () => import('../views/calander_page.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/loginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/registerPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
