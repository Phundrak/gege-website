<template>
  <h1>Campagnes</h1>
  <div class="flex-col flex-center">
    <RouterLink :to="{ name: 'new-campaign' }" class="button">Créer une campagne</RouterLink>
  </div>
  <div class="flex-col flex-center gap-2rem">
    <h2>Campagnes que je gère</h2>
    <ul v-if="campaignsGameMaster.length > 0" class="campaign-list">
      <li v-for="campaign in campaignsGameMaster" :key="campaign.id" class="campaign">
        <SmallCampaignCard :campaign="campaign" />
      </li>
    </ul>

    <div v-else>Pas de campagne pour l’instant</div>
  </div>
  <div class="flex-col flex-center gap-2rem">
    <h2>Campagnes où je joue</h2>
    <ul v-if="campaignsPlayer.length > 0" class="campaign-list">
      <li v-for="campaign in campaignsPlayer" :key="campaign.id">
        <SmallCampaignCard :campaign="campaign" />
      </li>
    </ul>
    <div v-else class="card">Pas de campagne pour l’instant</div>
  </div>
</template>

<script setup lang="ts">
import { usePocketbaseStore } from '@/stores/pocketbase';
import SmallCampaignCard from '@/components/SmallCampaignCard.vue';

import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import type { Campaign } from '@/models/Campaign';

const pbStore = usePocketbaseStore();
const campaigns = ref<Campaign[]>([]);
const campaignsGameMaster = computed<Campaign[]>(() =>
  campaigns.value.filter((campaign) => campaign.game_master === pbStore.auth.userId)
);
const campaignsPlayer = computed<Campaign[]>(() =>
  campaigns.value.filter((campaign) =>
    campaign.players.some((player) => player === pbStore.auth.userId)
  )
);

onMounted(() => {
  pbStore.campaigns.list().subscribe({
    next: (result) => (campaigns.value = result),
    error: (err) => console.warn(err),
    complete: () => console.log('List campaigns completed'),
  });
});
</script>

<style scoped lang="less">
@import '@/assets/_mixins';

.campaign-list {
  .ul-no-style;
  .flex-wrap;
  .flex-row;
  .gap-2rem;
  justify-content: space-around;
}
.campaign {
  display: inline-block;
  height: 100%;
}
</style>
