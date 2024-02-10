<template>
  <header class="flex-row-center flex-spread">
    <RouterLink class="title h4" :to="{ name: 'home' }">GéDR</RouterLink>
    <div class="buttons flex-row gap-1rem">
      <button @click="toggleDark()" class="secondary">{{ isDark ? 'Dark' : 'Light' }}</button>
      <button v-if="!loggedIn" @click="login()" class="secondary">Login</button>
      <RouterLink v-else :to="{ name: 'account' }" class="button secondary">Account</RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { usePocketbaseStore } from '@/stores/pocketbase';
import { ref } from 'vue';
import router from '@/router';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const pbStore = usePocketbaseStore();
const loggedIn = ref(pbStore.loggedIn);

const login = () => {
  pbStore.login().subscribe({
    next: () => router.go(0),
  });
};
</script>

<style scoped lang="less">
@import '@/assets/_theme';

header {
  padding: 1rem 2rem;
  height: 4.5rem;
  .themed(background-color, @light-background, @dark-background);
  .themed(border-bottom, solid @light-gray-10 1px, solid @dark-gray-10 1px);

  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>
