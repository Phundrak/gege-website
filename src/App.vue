<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppHeader />
  <main class="flex-col-center gap-3rem">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped lang="less">
main {
  justify-content: flex-start;
  margin: 5rem;
  align-content: center;
  padding-top: 4.5rem !important;
  padding-bottom: 10rem !important;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
}

@media screen {
  @media (max-width: 1000px) {
    main {
      margin: 3% 5%;
      overflow: visible !important;
    }
  }
}
</style>
