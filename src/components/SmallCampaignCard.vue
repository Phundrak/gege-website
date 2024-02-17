<template>
  <RouterLink :to="{ name: 'edit-campaign', params: { campaignId: props.campaign.id } }">
    <div class="campaign">
      <div class="campaign-title">
        {{ props.campaign.name }}
      </div>
      <div class="flex-col gamemaster">
        <div>Maître jeu</div>
        <div class="user">
          <UserAvatarAndName
            :user="props.campaign.expand!.game_master!"
            :type="'gamemaster'"
            :align="'right'" />
        </div>
      </div>
      <div class="flex-col gap-1rem players">
        <div><i class="gdrico-users"></i> Joueurs</div>
        <ul class="player-list">
          <li v-for="player in props.campaign.expand!.players" :key="player.id" class="player">
            <UserAvatarAndName :user="player" />
          </li>
        </ul>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import UserAvatarAndName from './UserAvatarAndName.vue';
import type { Campaign } from '@/models/Campaign';

const props = defineProps<{
  campaign: Campaign;
}>();
</script>

<style scoped lang="less">
@import '@/assets/main';

.campaign {
  min-width: 20rem;
  display: grid;
  grid-template-areas:
    'title gamemaster'
    'players players';
  width: 30rem;
  .card;
  .more;
  .gap-1rem;
}

.campaign-title {
  grid-area: title;
  .h4;
}

.gamemaster {
  grid-area: gamemaster;
  text-align: right;
  gap: 0.5rem;
}

.players {
  grid-area: players;
  width: 100%;
}

.player-list {
  flex-wrap: wrap;
  .ul-no-style;
  .flex-row;
  .gap-1rem;
  .flex-size-even;
}

.player {
  text-align: center;
  min-width: 10rem;
  .card;
  .primary;
}
</style>
