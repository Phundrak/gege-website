<template>
  <footer class="flex-row flex-spread card">
    <div id="copyright" class="small">Copyright &copy; {{ currentYear }} Lucien Cartier-Tilet</div>
    <div id="source">
      <a class="highlight small" href="https://labs.phundrak.com/phundrak/gege-jdr">Source code</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped="" lang="less">
@import '@/assets/_theme';

footer {
  margin: 2rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
