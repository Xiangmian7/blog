import { createRouter, createWebHistory } from 'vue-router'
import { sessionCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: '/main',
      component: () => import('../views/yqj-main.vue'),
      children: [
        {
          path: '/main/home',
          component: () => import('../views/yqj-home.vue')
        },
        {
          path: '/main/archive',
          component: () => import('../views/yqj-archive.vue')
        },
        {
          path: '/main/detail',
          component: () => import('../views/yqj-detail.vue')
        },
        {
          path: '/main/about',
          component: () => import('../views/yqj-about.vue')
        },
        {
          path: '/main/tool',
          component: () => import('../views/yqj-tool.vue')
        },
        {
          path: '/main/message',
          component: () => import('../views/yqj-message.vue')
        },
        {
          path: '/main/friend',
          component: () => import('../views/yqj-friend.vue')
        },
        {
          path: '/main/classify',
          component: () => import('../views/yqj-classify.vue')
        },
        {
          path: '/main/label',
          component: () => import('../views/yqj-label.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const page = sessionCache.getCache('page')
  if (to.path == '/main' && !page) {
    return '/main/home'
  } else if (to.path == '/main' && page) {
    return page
  }
})

export default router
