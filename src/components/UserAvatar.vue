<template>
  <div v-if="avatar" class="img-container">
    <img :alt="altText" :src="avatar" :height="size" :width="size" />
  </div>
  <i v-else :class="`gdrico-${icon}`"></i>
</template>

<script setup lang="ts">
import type { SimpleUser } from '@/models/User';
import { usePocketbaseStore } from '@/stores/pocketbase';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  user: SimpleUser;
  size?: number; // in px
  icon?: string;
}>();

const pbStore = usePocketbaseStore();
const icon = computed(() => props.icon ?? 'user');
const altText = computed(() => 'Avatar de ' + (props.user.name ?? props.user.username));
const size = computed(() => props.size ?? 20);
const avatar = ref<string | null>(null);

onMounted(() => {
  props.user.avatarLink(pbStore).subscribe({
    next: (link) => (avatar.value = link),
  });
});
</script>

<style scoped lang="less">
.img-container {
  border-radius: 1rem;

  img {
    object-fit: cover;
    border-radius: 1rem;
  }
}
</style>
