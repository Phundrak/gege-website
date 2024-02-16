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
      component: () => import('@/views/ListCampaignsView.vue'),
    },
    {
      path: '/new-campaign',
      name: 'new-campaign',
      component: () => import('@/views/CreateCampaignView.vue'),
    },
    {
      path: '/campaign/:campaignId',
      name: 'edit-campaign',
      component: () => import('@/views/CampaignView.vue'),
    },
  ],
});

export default router;
