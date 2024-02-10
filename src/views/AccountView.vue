<template>
  <div class="flex-col-center">
    <h1>Hello {{ username }}&nbsp;!</h1>
    <div>
      <h2>Actions</h2>
      <ul class="no-style flex-col-center gap-1rem">
        <li>
          <button @click="logout()">Logout</button>
        </li>
        <li>
          <button @click="openModal()">Delete Account</button>
        </li>
      </ul>
    </div>
  </div>
  <transition name="modal-fade">
    <AppModal :type="'action'" v-show="showModal" @close="closeModal()" @agree="deleteAccount">
      <template v-slot:header>Suppression de compte</template>
      <template v-slot:body>
        <p>
          Voulez-vous vraiment supprimer votre compte&nbsp;? Cette action est irréversible et
          supprimera toutes les données liées à votre compte.
        </p>
        <p>
          Vous pourrez à tout moment vous recréer un compte vierge si vous décidez à un moment
          d&apos;utiliser à nouveau ce site web.
        </p>
      </template>
    </AppModal>
  </transition>
</template>

<script setup lang="ts">
import { usePocketbaseStore } from '@/stores/pocketbase';
import router from '@/router';
import AppModal from '@/components/AppModal.vue';
import { ref } from 'vue';

const pbStore = usePocketbaseStore();
const username = pbStore.auth.username;
const showModal = ref<boolean>(false);

const logout = () => {
  pbStore.auth.logout();
  router.go(0);
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const deleteAccount = () => {
  pbStore.auth.deleteAccount().subscribe({
    next: () => {
      closeModal();
      pbStore.auth.logout();
      router.go(0);
    },
  });
};
</script>

<style scoped lang="less">
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  transition: opacity 0.5 ease;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5 ease;
}
</style>
