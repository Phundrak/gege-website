<template>
  <div class="flex-row flex-center user" :style="`justify-content: ${align}`">
    <UserAvatar
      :user="props.user"
      :icon="type === 'gamemaster' ? 'user-tie' : 'user'"
      :size="20"
      :style="'width: 20px'" />
    <span>{{ props.user.displayName() }}</span>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';
import type { SimpleUser } from '@/models/User';
import { computed } from 'vue';

const props = defineProps<{
  user: SimpleUser;
  type?: 'gamemaster' | 'player';
  align?: 'right' | 'center' | 'left';
}>();

const type = computed(() => props.type ?? 'player');
const align = computed(() => props.align ?? 'center');
</script>

<style scoped lang="less">
.user {
  gap: 0.5rem;
}
</style>
