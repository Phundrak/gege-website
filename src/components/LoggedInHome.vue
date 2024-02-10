<template>Bonjour {{ pbStore.username }}&nbsp;!</template>

<script setup="" lang="ts">
import { usePocketbaseStore } from '@/stores/pocketbase';
const pbStore = usePocketbaseStore();
</script>
