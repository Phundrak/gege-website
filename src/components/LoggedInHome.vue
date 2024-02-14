<template>
  <div class="h2">Bonjour {{ pbStore.auth.username }}&nbsp;!</div>

  <div class="campagnes flex-col-center gap-2rem">
    <div class="h4">Actions</div>
    <RouterLink :to="{ name: 'campaigns' }" class="button">Mes campagnes</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { usePocketbaseStore } from '@/stores/pocketbase';
import { RouterLink } from 'vue-router';

const pbStore = usePocketbaseStore();
</script>

<style scoped lang="less">
.campaigns {
  max-width: 80%;
}
</style>
