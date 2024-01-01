<template>
  <section class="container-fluid">
    <section class="row">
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
    AppState.activeMonster = ref(AppState.monsters.shift())
    const boss = computed(() => {
      const monster = AppState.activeMonster
      if (monster) {
        return {
          name: monster.name,
          img: monster.img,
          damage: monster.damage,
          health: monster.health,
          maxHealth: monster.maxHealth,
          level: monster.level,
          coins: monster.coins
        }
      } else {
        console.log('Boss not found')
      }
    })


    function damageBoss(damage) {
      AppState.activeMonster.health -= damage
    }




    function killBoss() {
      console.log('killing the boss')
      AppState.activeMonster.level++
      AppState.activeMonster.maxHealth = Math.round(AppState.activeMonster.maxHealth * 1.5)
      AppState.activeMonster.health = AppState.activeMonster.maxHealth
      AppState.monsters.push(AppState.activeMonster)
      AppState.activeMonster = AppState.monsters.shift()
      console.log('the new boss is:', AppState.activeMonster)
    }



    watch(() => AppState.activeMonster.health, (theirHealth) => {
      if (theirHealth <= 0) {
        console.log('recognizing health is below 0');
        killBoss();
      }
    })



    const attacks = [{ emoji: '🪥', damage: 5 }, { emoji: '🧹', damage: 10 }, { emoji: '🧼', damage: 20 }]

    console.log('👹 active monster:', AppState.activeMonster)
    return {
      attacks,
      damageBoss,
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