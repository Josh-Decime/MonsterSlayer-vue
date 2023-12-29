<template>
  <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 card align-items-center shadow rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->

  <section class="container-fluid">
    <section class="row">
      <div>
        <h1>{{ bossHealth }} / {{ bossMaxHealth }}</h1>
        <img v-if="bossImg" :src="bossImg" :alt="bossName">
      </div>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, ref } from 'vue';
export default {
  setup() {
    AppState.activeMonster = AppState.monsters[0]
    const bossHealth = ref(AppState.activeMonster.health)
    const bossMaxHealth = AppState.activeMonster.maxHealth
    const bossImg = AppState.activeMonster.img
    const bossName = AppState.activeMonster.name
    console.log('👹 active monster:', AppState.activeMonster)
    console.log('👹➕ boss health:', bossHealth)
    console.log('👹➕🔝 boss max health', bossMaxHealth)
    return {
      bossHealth,
      bossMaxHealth,
      bossImg,
      bossName

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
