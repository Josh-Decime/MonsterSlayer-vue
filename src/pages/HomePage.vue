<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-6">
        <h3>Your Coins: {{ yourCoins }}</h3>
        <div v-if="equipCheck">
          <div v-for="hero in heroes">
            <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="character-img">
            <p class="my-0 fs-4 bold">{{ hero.name }}: Lvl {{ hero.level }}</p>
            <p class="my-0">Health: {{ hero.health }} / {{ hero.maxHealth }}</p>
            <!-- <div class="progress">
              <div :class="`progress-bar`" role="progressbar"
                :style="{ width: `${(hero.health / hero.maxHealth) * 100}%` }">
              </div>
            </div> -->

            <!-- can also just disable button, but i like my solution better -->
            <!-- <button :disabled="hero.hasAttacked" class="btn btn-primary" @click="heroAttack(hero)">
                🪥 {{ hero.damage }}</button> -->
            <button v-if="hero.hasAttacked == false" class="btn btn-primary" @click="heroAttack(hero)">🪥 {{ hero.damage
            }}</button>
            <button v-else class="btn btn-secondary" @click="heroAttack(hero)">🪥 {{ hero.damage }}</button>
          </div>
        </div>

        <div v-else>
          <p class="fs-1 bolder">No team equipped!</p>
          <p class="fs-2 bolder">Go to store to equip your team!</p>
        </div>

        <button class="btn btn-success" @click="endRound">End your turn</button>

      </div>
      <div class="col-6">
        <h1>{{ boss.name }}</h1>
        <h3>{{ boss.health }} / {{ boss.maxHealth }}</h3>
        <div class="progress">
          <div :class="`progress-bar`" role="progressbar" :style="{ width: `${(boss.health / boss.maxHealth) * 100}%` }">
          </div>
        </div>
        <img v-if="boss.img" :src="boss.img" :alt="boss.name">
      </div>
    </section>
  </section>
</template>

<script>
import { AppState } from '../AppState.js';
import { computed, ref, watch, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { monsterService } from '../services/MonstersService.js';
import { characterService } from '../services/CharactersService.js'
export default {
  setup() {

    // SECTION Monster
    // NOTE the activeMonster is set in App.vue
    const boss = computed(() => AppState.activeMonster)


    watch(() => AppState.activeMonster.health, (theirHealth) => {
      if (theirHealth <= 0) {
        console.log('recognizing health is below 0');
        killBoss();
      }
    })


    function killBoss() {
      monsterService.killBoss()
      payPlayer()
    }


    function payPlayer() {
      monsterService.payPlayer()
    }



    // SECTION character
    const heroes = computed(() => AppState.equippedCharacters)


    function equipTeam() {
      characterService.equipTeam()
    }
    onMounted(() => {
      equipTeam()
    })
    computed(() => {
      equipTeam()
    })


    const equipCheck = computed(() => {
      const areEquipped = AppState.equippedCharacters
      return areEquipped.length > 0
    })


    const yourCoins = computed(() => {
      return AppState.playerCoins
    })


    function heroAttack(hero) {
      characterService.heroAttack(hero)
    }


    function endRound() {
      characterService.endRound()
    }


    return {
      boss,
      heroes,
      equipTeam,
      equipCheck,
      heroAttack,
      yourCoins,
      endRound,
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

.character-img {
  height: 20vh;

}
</style>