import '@/assets/main.less';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { usePocketbaseStore } from '@/stores/pocketbase';

import App from './App.vue';
import router from './router';

const app = createApp(App);

router.beforeEach((to, from, next) => {
  const pbStore = usePocketbaseStore();
  if (!pbStore.auth.loggedIn && ['home', 'login'].every((path) => path != to.name)) {
    next({ name: 'home' });
  } else {
    next();
  }
});

app.use(createPinia());
app.use(router);

app.mount('#app');
