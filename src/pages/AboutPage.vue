<template>
  <section class="background">
    <div class="about">
      <h1>Welcome to the store</h1>
      <h3>Your Coins: {{ yourCoins }}</h3>
    </div>

    <section class="container-fluid">
      <section class="row">

        <!-- SECTION display all heroes -->
        <div v-for="hero in heroesForSale" class="col-4">
          <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="store-characters-img">
          <h3>{{ hero.name }}: Lvl {{ hero.level }}</h3>
          <p class="my-0">Health: {{ hero.health }}/{{ hero.maxHealth }}</p>
          <p class="m-0">Damage: {{ hero.damage }}</p>

          <!-- SECTION explain heroes special moves -->
          <div>
            <span>Special Move: </span>
            <span v-if="hero.striker">Striker, costs 💪{{ hero.strikeCost }} to deal {{ hero.strikeAmount }}
              damage</span>
            <span v-if="hero.healer">Healer, costs 💪{{ hero.healCost }} to heal the team by +{{ hero.healAmount
              }}</span>
            <span v-if="hero.healerOverTime">Heal over time, costs 💪{{ hero.healOverTimeCost }} to heal the team
              +{{ hero.healOverTimeAmount }}/round for {{ hero.healOverTimeDuration }} rounds</span>
            <span v-if="hero.shield">Shield, costs 💪{{ hero.shieldCost }} for the team to be immune to damage next
              round</span>
            <span v-if="hero.overcharge">Overcharge, use this round to increase 💪 by {{ hero.overchargeAmount }}</span>
            <span v-if="hero.kamikaze">Kamikaze, costs 💪{{ hero.kamikazePowerCost }} & this hero loses
              -{{ hero.kamikazeHealthCost }} health to deal {{ hero.kamikazeDamage }} damage</span>
          </div>

          <!-- SECTION Buy, equip, upgrade, heal heroes -->
          <button v-if="hero.unlocked && !hero.dead" class="btn btn-primary"
            :class="{ 'disabled': yourCoins < hero.upgradeCost }" @click="upgradeCharacter(hero)">
            {{ hero.upgradeCost }} Upgrade</button>

          <button v-if="!hero.unlocked" :class="{ 'btn btn-primary': true, 'disabled': yourCoins < hero.purchasePrice }"
            @click="buyCharacter(hero)"> {{ hero.purchasePrice }} Buy</button>

          <button v-if="hero.unlocked && hero.health < hero.maxHealth && !hero.dead" class="btn btn-success"
            @click="potionHealCharacter(hero)">
            {{ hero.potionCost }} Heal</button>

          <button v-if="hero.dead" class="btn btn-primary" :class="{ 'disabled': yourCoins < hero.reviveCost }"
            @click="reviveCharacter(hero)">Revive for {{ hero.reviveCost }} coins</button>

          <button v-if="hero.unlocked && hero.equip == false" class="btn btn-success"
            @click="equipCharacter(hero)">Equip</button>

          <button v-if="hero.unlocked && hero.equip" class="btn btn-secondary"
            @click="unEquipCharacter(hero)">Un-equip</button>
        </div>
      </section>
    </section>

    <!-- SECTION return to battle button -->
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <button class="fs-3 btn btn-success mt-3">Get back to cleaning</button>
      </div>
    </router-link>

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

    function reviveCharacter(hero) {
      characterService.reviveCharacter(hero)
    }
    function potionHealCharacter(hero) {
      characterService.potionHealCharacter(hero)
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
      reviveCharacter,
      potionHealCharacter,
    }
  }
}
</script>

<style scoped lang="scss">
.store-characters-img {
  height: 20vh;
}

.background {
  min-height: 120vh;
  background-image: url('src/assets/img/CleaningStore.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: rgb(255, 255, 255);
}

.background::before {
  content: '';
  position: absolute;
  top: 10;
  left: 0;
  width: 100%;
  height: 120vh;
  background: rgba(72, 72, 72, 0.5);
  z-index: 1;
}

.background>* {
  position: relative;
  z-index: 2;
}
</style>
