<template>
  <div id="campaign">
    <h1>Gestion de campagne</h1>
    <h2>{{ campaign?.name }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from '@/models/Campaign';
import { usePocketbaseStore } from '@/stores/pocketbase';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pbStore = usePocketbaseStore();
const campaign = ref<Campaign>();

onMounted(() => {
  pbStore.campaigns.get(route.params.campaignId as string).subscribe({
    next: (result) => (campaign.value = result),
  });
});
</script>
