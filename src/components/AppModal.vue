<template>
  <div class="modal-backdrop">
    <div class="modal flex-col">
      <header class="modal-header flex h3">
        <slot name="header">Default modal title</slot>
      </header>
      <button class="btn-close" type="button" @click="close">x</button>
      <section class="modal-body">
        <slot name="body">Default modal body</slot>
      </section>
      <footer class="modal-footer flex-col">
        <slot name="footer"></slot>
        <button v-if="props.type === 'info'" class="accent" type="button" @click="close">
          Fermer
        </button>
        <div v-else class="gap-1rem buttons">
          <button class="faded" type="button" @click="close">Annuler</button>
          <button type="button" @click="agree">OK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'info' | 'action';
}>();
const emit = defineEmits(['close', 'agree']);
const close = () => {
  emit('close');
};
const agree = () => {
  emit('agree');
};
</script>

<style scoped lang="less">
@import '@/assets/_theme';
@outer-padding: 3rem;

.modal-backdrop {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .themed(background-color, @light-gray-80, @light-gray-80);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  z-index: 11;
  .themed(background, @light-background, @dark-background);
  .themed(color, @light-text, @dark-text);
  .themed(
    box-shadow,
    0.2rem 0.2rem 2rem 1px @light-background-100,
    0.2rem 0.2rem 4rem 1px @dark-background-300
  );
  overflow-x: auto;
  border-radius: 1rem;
}

.modal-header,
.modal-footer {
  padding: @outer-padding;
}

.modal-header {
  position: relative;
  border-bottom: 1px solit @dark-gray-80;
  justify-content: space-between;
  .themed(color, @light-primary, @dark-primary);
}

.modal-footer {
  border-top: 1px solid @dark-gray-80;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: (@outer-padding / 2) @outer-padding;
  max-width: 50rem;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  background: transparent;
  .themed(color, @light-background, @dark-text);
}
</style>
