<template>
  <div class="about">
    <h1>Welcome to the store</h1>
    <h3>Your Coins: {{ yourCoins }}</h3>
  </div>

  <section class="container-fluid">
    <section class="row">
      <div v-for="hero in heroesForSale" class="col-4">
        <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="store-characters-img">
        <h3>{{ hero.name }}</h3>
        <button v-if="hero.unlocked" class="btn btn-primary"> {{ hero.upgradeCost }} Upgrade</button>
        <button v-else="" class="btn btn-primary" @click="buyCharacter(hero)"> {{ hero.purchasePrice }} Buy</button>
        <button v-if="hero.unlocked && hero.equip == false" class="btn btn-success">Equip</button>
        <button v-if="hero.unlocked && hero.equip" class="btn btn-secondary">Un-equip</button>
      </div>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed, ref, watch, reactive } from 'vue';
import HomePage from './HomePage.vue';
export default {
  components: {
    HomePage,
  },
  setup() {
    const heroesForSale = computed(() => {
      return AppState.Characters.map(character => {
        console.log('character', character)
        return reactive({
          name: character.name,
          img: character.img,
          damage: character.damage,
          maxHealth: character.maxHealth,
          purchasePrice: character.purchasePrice,
          unlocked: character.unlocked,
          equip: character.equip,
          upgradeCost: character.upgradeCost,
        })
      })
    })

    const yourCoins = computed(() => {
      return AppState.playerCoins
    })

    function buyCharacter(hero) {
      hero.unlocked = true
      console.log('hero being purchased', hero)
    }
    console.log('hero for sale', heroesForSale)
    return {
      heroesForSale,
      buyCharacter,
      yourCoins
    }
  }
}
</script>

<style scoped lang="scss">
.store-characters-img {
  height: 20vh;
}
</style>
