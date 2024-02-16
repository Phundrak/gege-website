<template>
  <header class="flex-row-center flex-spread">
    <RouterLink class="title h4" :to="{ name: 'home' }">{{ appTitle }}</RouterLink>
    <div class="buttons gap-1rem">
      <button @click="toggleDark()" class="secondary">
        <i v-if="isDark" class="gdrico-moon"></i>
        <i v-else class="gdrico-sun"></i>
      </button>

      <button v-if="!loggedIn" @click="login()" class="secondary">Connexion</button>
      <RouterLink v-else :to="{ name: 'account' }" class="button secondary">
        <div id="account" class="flex-row">
          <i class="gdrico-user"></i>
          <div>Compte</div>
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { usePocketbaseStore } from '@/stores/pocketbase';
import { ref } from 'vue';
import router from '@/router';

const appTitle = import.meta.env.VITE_NAME;

const isDark = useDark();
const toggleDark = useToggle(isDark);
const pbStore = usePocketbaseStore();
const loggedIn = ref(pbStore.auth.loggedIn);

const login = () => {
  pbStore.auth.login().subscribe({
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

#account {
  gap: 0.5rem;
}
</style>
