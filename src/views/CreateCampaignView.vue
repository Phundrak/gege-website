<template>
  <h1>Création d’une campagne</h1>
  <form @submit.prevent="createCampaign" class="flex-col gap-2rem card" autocomplete="off">
    <label for="campaign-name" class="flex-col gap-1rem">Nom de la nouvelle campagne</label>
    <input
      name="campaign-name"
      type="text"
      v-model="campaign.name"
      placeholder="Nom de la nouvelle campagne" />

    <label class="flex-col gap-1rem" for="players" autocomplete="off">Joueurs (2 à 10)</label>
    <select id="players" name="players" multiple v-model="campaign.players">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ displayName(user) }}
      </option>
    </select>

    <div class="buttons gap-1rem">
      <RouterLink :to="{ name: 'home' }" class="button faded">Annuler</RouterLink>
      <button type="submit">Envoyer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@/router';
import { usePocketbaseStore } from '@/stores/pocketbase';
import { type NewCampaign } from '@/models/Campaign';
import { type SimpleUser, displayName } from '@/models/User';

const pbStore = usePocketbaseStore();
const users = ref<SimpleUser[]>([]);

const campaign = ref<NewCampaign>({
  name: null,
  game_master: pbStore.auth.userId,
  players: [],
});

const createCampaign = () => {
  pbStore.campaign.createCampaign(campaign.value).subscribe({
    next: () => {
      router.push({ name: 'home' });
    },
  });
};

onMounted(() => {
  pbStore.users.allUsersSimple().subscribe({
    next: (results) => (users.value = results.filter((user) => user.id !== pbStore.auth.userId)),
    error: (err) => console.warn('Failed to fetch all users', err),
  });
});
</script>

<style scoped lang="less">
form {
  min-width: 90%;
}
</style>
