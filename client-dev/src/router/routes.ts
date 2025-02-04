import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/about',
        component: () => import('pages/AboutPage.vue'),
      },
      {
        path: '/ai-chat',
        component: () => import('pages/AiChat.vue'),
      },
      {
        path: '/document-intelligence',
        component: () => import('pages/ReadDocument.vue'),
      },
      {
        path: '/doc-for-github-repo',
        component: () => import('pages/DocGithub.vue'),
      },
      {
        path: '/doc-for-zipped-code',
        component: () => import('pages/DocZipped.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
