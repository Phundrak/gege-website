<template>
  <LoggedInHome v-if="pbStore.auth.loggedIn" />
  <LoggedOutHome v-else />
</template>

<script lang="ts" setup>
import { usePocketbaseStore } from '@/stores/pocketbase';

import LoggedOutHome from '@/components/LoggedOutHome.vue';
import LoggedInHome from '@/components/LoggedInHome.vue';

const pbStore = usePocketbaseStore();
pbStore.auth.refresh().subscribe({
  error: (err) => console.log('Could not refresh account data:', err),
});
</script>
