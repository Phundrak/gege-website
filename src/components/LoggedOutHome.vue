<template>
  <div class="two-col-img-text gap-4rem">
    <img alt="Logo de Gégé" src="/assets/gege.png" />
    <h1>GéDR</h1>
  </div>
  <h2 class="card">
    L&apos;application web pour vous accompagner pour votre JDR avec Gégé, le bot discord.
  </h2>
  <div>
    <h3>Pourquoi&nbsp;?</h3>
    <ul class="features">
      <li class="feature">Créer ses personnages</li>
      <li class="feature">Gérer ses fiche personnage</li>
      <li class="feature">Faire évoluer ses personnage</li>
    </ul>
  </div>
  <button class="h4 raise margin-3rem">Se connecter avec Discord</button>
</template>

<style scoped lang="less">
@import '@/assets/main';

.features {
  .flex-row-center;
  .flex-size-even;
  .gap-1rem;
  .ul-no-style;
  flex-wrap: wrap;
  align-items: stretch;
}

.feature {
  .card;
  .more;
  .text-center;
  min-width: 15rem;
}
</style>
