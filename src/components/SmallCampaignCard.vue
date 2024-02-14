<template>
  <div class="card primary flex-col gap-1rem">
    <div class="h4" id="name">
      {{ props.campaign.name }}
    </div>
    <div id="dm">
      {{ displayName(props.campaign.expand!.game_master!) }}
    </div>
    <ul id="players" class="no-style">
      <li v-for="player in props.campaign.expand!.players" :key="player.id">
        {{ displayName(player) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from '@/models/Campaign';
import { displayName } from '@/models/User';

const props = defineProps<{
  campaign: Campaign;
}>();
</script>

<style scoped lang="less">
.card {
  min-width: 20rem;
}
</style>
