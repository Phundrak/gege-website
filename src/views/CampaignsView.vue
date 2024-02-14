<template>
  <h1>Campagnes</h1>
  <div class="flex-col gap-2rem">
    <div class="flex-col flex-center">
      <RouterLink :to="{ name: 'new-campaign' }" class="button">Créer une campagne</RouterLink>
    </div>
    <h2>Campagnes que je gère</h2>
    <div>
      <ul
        v-if="campaignsGameMaster.length > 0"
        class="no-style center flex-wrap flex-size-even flex-even gap-1rem">
        <li v-for="campaign in campaignsGameMaster" :key="campaign.id">
          <SmallCampaignCard :campaign="campaign" />
        </li>
      </ul>

      <div v-else>Pas de campagne pour l’instant</div>
    </div>
  </div>
  <div>
    <h2>Campagnes où je joue</h2>
    <div>
      <ul
        v-if="campaignsPlayer.length > 0"
        class="no-style center flex-wrap flex-size-even flex-even gap-1rem">
        <li v-for="campaign in campaignsGameMaster" :key="campaign.id">
          <SmallCampaignCard :campaign="campaign" />
        </li>
      </ul>
      <div v-else class="card">Pas de campagne pour l’instant</div>
    </div>
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
  pbStore.campaign.listCampaigns().subscribe({
    next: (result) => (campaigns.value = result),
    error: (err) => console.warn(err),
    complete: () => console.log('List campaigns completed'),
  });
});
</script>
