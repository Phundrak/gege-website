import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('@/views/CampaignsView.vue'),
    },
    {
      path: '/new-campaign',
      name: 'new-campaign',
      component: () => import('@/views/CreateCampaignView.vue'),
    },
  ],
});

export default router;
