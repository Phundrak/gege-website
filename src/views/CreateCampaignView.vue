<template>
  <h1>Création d’une campagne</h1>
  <div class="h3 card" v-if="campaign.name">
    {{ campaign.name }}
  </div>
  <form @submit.prevent="createCampaign" class="flex-col gap-2rem card">
    <label for="campaign-name" class="flex-col gap-1rem">Nom de la nouvelle campagne</label>
    <input
      name="campaign-name"
      type="text"
      v-model="campaign.name"
      placeholder="Nom de la nouvelle campagne" />

    <div class="buttons gap-1rem">
      <RouterLink :to="{ name: 'home' }" class="button faded">Annuler</RouterLink>
      <button type="submit">Envoyer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router';
import { usePocketbaseStore, type NewCampaign } from '@/stores/pocketbase';
import { type RecordModel } from 'pocketbase';
import { onMounted, ref } from 'vue';

const pbStore = usePocketbaseStore();
const simpleUsers = ref<RecordModel[]>([]);

const campaign = ref<NewCampaign>({
  name: null,
  game_master: pbStore.auth.userId,
  players: null,
});

const createCampaign = () => {
  pbStore.campaign.createCampaign(campaign.value).subscribe({
    next: () => {
      router.push({ name: 'home' });
      router.go(0);
    },
  });
};

onMounted(() => {
  pbStore.users.simpleUserList().subscribe({
    next: (result) => (simpleUsers.value = result),
    error: (err) => console.error('Failed to create campaign:', err),
  });
});
</script>

<style scoped lang="less">
form {
  min-width: 90%;
}
</style>
