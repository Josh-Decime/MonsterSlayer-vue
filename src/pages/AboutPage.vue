<template>
  <div class="about">
    <h1>Welcome to the store</h1>
    <h3>Your Coins: {{ yourCoins }}</h3>
  </div>

  <section class="container-fluid">
    <section class="row">
      <div v-for="hero in heroesForSale" class="col-4">
        <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="store-characters-img">
        <h3>{{ hero.name }}: Lvl {{ hero.level }}</h3>
        <p class="my-0">Health: {{ hero.health }}/{{ hero.maxHealth }}</p>
        <p class="m-0">Damage: {{ hero.damage }}</p>
        <button v-if="hero.unlocked" class="btn btn-primary" @click="upgradeCharacter(hero)">
          {{ hero.upgradeCost }} Upgrade</button>
        <button v-else="" class="btn btn-primary" @click="buyCharacter(hero)"> {{ hero.purchasePrice }} Buy</button>
        <button v-if="hero.unlocked && hero.equip == false" class="btn btn-success"
          @click="equipCharacter(hero)">Equip</button>
        <button v-if="hero.unlocked && hero.equip" class="btn btn-secondary"
          @click="unEquipCharacter(hero)">Un-equip</button>
      </div>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, ref, watch, reactive, popScopeId, onMounted } from 'vue';
import HomePage from './HomePage.vue';
import Pop from '../utils/Pop.js';
import { characterService } from '../services/CharactersService.js';
export default {
  components: {
    HomePage,
  },
  setup() {
    const heroesForSale = computed(() => AppState.Characters)

    function equipTeam() {
      characterService.equipTeam()
    }
    onMounted(() => {
      equipTeam()
    })
    computed(() => {
      equipTeam()
    })


    const yourCoins = computed(() => {
      return AppState.playerCoins
    })

    function buyCharacter(hero) {
      characterService.buyCharacter(hero)
    }


    function equipCharacter(hero) {
      characterService.equipCharacter(hero)
    }

    function unEquipCharacter(hero) {
      characterService.unEquipCharacter(hero)
    }

    function upgradeCharacter(hero) {
      characterService.upgradeCharacter(hero)
    }

    console.log('hero for sale', heroesForSale)
    return {
      heroesForSale,
      equipTeam,
      buyCharacter,
      yourCoins,
      equipCharacter,
      unEquipCharacter,
      upgradeCharacter,
    }
  }
}
</script>

<style scoped lang="scss">
.store-characters-img {
  height: 20vh;
}
</style>
