<template>
  <div class="flex-row flex-center user" :style="`justify-content: ${align}`">
    <UserAvatar
      :user="props.user"
      :icon="type === 'gamemaster' ? 'user-tie' : 'user'"
      :size="avatarSize"
      :style="'width: ${avatarSize}px'" />
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
  avatarSize?: number;
  align?: 'right' | 'center' | 'left';
}>();

const type = computed(() => props.type ?? 'player');
const avatarSize = computed(() => props.avatarSize ?? 20);
const align = computed(() => props.align ?? 'center');
</script>

<style scoped lang="less">
.user {
  gap: 0.5rem;
}
</style>
