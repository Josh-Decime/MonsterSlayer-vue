<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-6">
        <span class="fs-3">Your Coins: {{ yourCoins }}🪙</span>
        <span class="fs-3 mx-5">Your Power: {{ yourPower }}💪</span>
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
            <button v-if="!hero.hasAttacked && !hero.dead" class="btn btn-primary" @click="heroAttack(hero)">
              🪥 {{ hero.damage }}</button>

            <button v-if="hero.healer && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="specialMoveHeal(hero)">Pay 💪{{ hero.healCost }} to heal ➕{{ hero.healAmount }}</button>

            <button v-if="hero.hasAttacked && !hero.dead" class="btn btn-secondary disabled">Already
              used their turn this round</button>
            <button v-if="hero.dead" class="btn btn-primary" @click="reviveCharacter(hero)">Revive for {{
          hero.reviveCost }} coins</button>
          </div>
        </div>

        <div v-else>
          <p class="fs-1 bolder">No team equipped!</p>
          <p class="fs-2 bolder">Go to store to equip your team!</p>
        </div>

        <button v-if="equipCheck" class="btn btn-success" @click="endRound">End your turn</button>
        <button v-if="equipCheck" class="btn btn-danger" @click="quickAttack">Quick Attack</button>

      </div>
      <div class="col-6">
        <h1>{{ boss.name }}</h1>
        <h3>{{ boss.health }} / {{ boss.maxHealth }}</h3>
        <div class="progress">
          <div :class="`progress-bar`" role="progressbar"
            :style="{ width: `${(boss.health / boss.maxHealth) * 100}%` }">
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
        // NOTE reset hero.hasAttacked after boss dies? maybe not, this way you strategically choose who to have finish off the boss instead of just over-killing them
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
    const yourPower = computed(() => {
      return AppState.playerPower
    })


    function heroAttack(hero) {
      characterService.heroAttack(hero)
    }


    function endRound() {
      characterService.endRound()
    }

    function quickAttack() {
      characterService.quickAttack()
    }

    function reviveCharacter(hero) {
      characterService.reviveCharacter(hero)
    }

    function specialMoveHeal(hero) {
      characterService.specialMoveHeal(hero)
    }


    return {
      boss,
      heroes,
      equipTeam,
      equipCheck,
      heroAttack,
      yourCoins,
      endRound,
      quickAttack,
      reviveCharacter,
      yourPower,
      specialMoveHeal,
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