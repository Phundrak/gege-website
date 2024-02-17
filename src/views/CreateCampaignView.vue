<template>
  <h1>Création d’une campagne</h1>
  <form @submit.prevent="createCampaign" class="flex-col gap-2rem card" autocomplete="off">
    <label for="campaign-name">Nom de la nouvelle campagne</label>
    <div>
      <input
        name="campaign-name"
        type="text"
        v-model="campaign.name"
        autocomplete="off"
        placeholder="Nom de la nouvelle campagne" />
    </div>

    <fieldset class="player-selection">
      <legend class="highlight" for="players" autocomplete="off">Joueurs</legend>
      <div v-for="user in users" :key="user.id" class="player">
        <input type="checkbox" v-model="players" :name="user.id" :value="user.id" :id="user.id" />
        <label :for="user.id"><UserAvatarAndName :user="user" :align="'left'" /></label>
      </div>
    </fieldset>
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
import { type SimpleUser } from '@/models/User';
import UserAvatarAndName from '@/components/UserAvatarAndName.vue';

const pbStore = usePocketbaseStore();
const users = ref<SimpleUser[]>([]);
const players = ref([]);

const campaign = ref<NewCampaign>({
  name: null,
  game_master: pbStore.auth.userId,
  players: [],
});

const createCampaign = () => {
  campaign.value.players = [...players.value];
  pbStore.campaigns.create(campaign.value).subscribe({
    next: () => {
      router.push({ name: 'home' });
    },
  });
};

onMounted(() => {
  pbStore.users.listSimple().subscribe({
    next: (results) => {
      users.value = results.filter((user) => user.id !== pbStore.auth.userId);
    },
    error: (err) => console.warn('Failed to fetch all users', err),
  });
});
</script>

<style scoped lang="less">
@import '@/assets/main';

form {
  min-width: 90%;
}

.player-selection {
  border: none;
  .card;
  .more;
  .flex-col;
  .gap-1rem;
}

.player {
  .flex-row;
  gap: 0.5rem;
}
</style>
