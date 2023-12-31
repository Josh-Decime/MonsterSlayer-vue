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
      <!-- :key="componentKey"    goes inside that div-->
      <div>
        <h1>{{ boss.name }}</h1>
        <h3>{{ boss.health }} / {{ boss.maxHealth }}</h3>
        <img v-if="boss.img" :src="boss.img" :alt="boss.name">
      </div>
      <button v-for="attack in attacks" class="btn btn-primary col-2" @click="damageBoss(attack.damage)">
        {{ attack.emoji }}{{ attack.damage }}</button>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, ref, watch } from 'vue';
export default {
  setup() {
    AppState.activeMonster = ref(AppState.monsters[0])
    const boss = computed(() => {
      const monster = AppState.activeMonster.value
      return {
        name: monster.name,
        img: monster.img,
        damage: monster.damage,
        health: monster.health,
        maxHealth: monster.maxHealth,
        level: monster.level,
      }
    })

    // const bossHealth = ref(AppState.activeMonster.health)
    // const bossMaxHealth = ref(AppState.activeMonster.maxHealth)
    // const bossImg = ref(AppState.activeMonster.img)
    // const bossName = ref(AppState.activeMonster.name)



    function damageBoss(damage) {
      AppState.activeMonster.health -= damage
    }


    // const componentKey = ref(0);
    // const forceRerender = () => {
    //   componentKey.value += 1;
    // }

    function killBoss() {
      console.log('killing the boss')
      AppState.activeMonster.level++
      AppState.activeMonster.maxHealth = Math.round(AppState.activeMonster.maxHealth * 1.5)
      AppState.activeMonster.health = AppState.activeMonster.maxHealth
      AppState.monsters.push(AppState.activeMonster)
      AppState.activeMonster = AppState.monsters.shift()
      // forceRerender()
      console.log('the new boss is:', AppState.activeMonster)
    }

    // const bossDies = computed(() => {
    //   if (bossHealth.value <= 0) {
    //     killBoss()
    //   }
    // })

    watch(() => AppState.activeMonster.health, (theirHealth) => {
      if (theirHealth <= 0) {
        console.log('recognizing health is below 0');
        killBoss();
      }
    })



    const attacks = [{ emoji: '🪥', damage: 5 }, { emoji: '🧹', damage: 10 }, { emoji: '🧼', damage: 20 }]

    console.log('👹 active monster:', AppState.activeMonster)
    // console.log('👹➕ boss health:', bossHealth)
    // console.log('👹➕🔝 boss max health', bossMaxHealth)
    return {
      // bossHealth,
      // bossMaxHealth,
      // bossImg,
      // bossName,
      attacks,
      damageBoss,
      // bossDies
      // componentKey
      boss,
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