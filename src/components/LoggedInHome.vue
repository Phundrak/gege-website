<template>
  <div class="h3">Bonjour {{ pbStore.auth.username }}&nbsp;!</div>

  <div class="campagnes flex-col-center gap-2rem">
    <h1>Campagnes</h1>
    <RouterLink :to="{ name: 'new-campaign' }" class="button">Créer une campagne</RouterLink>
    <ul v-if="campaigns.length > 0">
      <li v-for="campaign in campaigns" :key="campaign.id">{{ campaign }}</li>
    </ul>
    <div v-else>Pas de campagnes pour l’instant</div>
  </div>
</template>

<script setup="" lang="ts">
import { usePocketbaseStore } from '@/stores/pocketbase';
import { type RecordModel } from 'pocketbase';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
const pbStore = usePocketbaseStore();

const campaigns = ref<RecordModel[]>([]);

onMounted(() => {
  pbStore.campaign.listCampaigns().subscribe({
    next: (result) => (campaigns.value = result),
  });
});
</script>
