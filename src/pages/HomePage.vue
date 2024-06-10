<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-6">
        <span class="fs-3">Your Coins: {{ yourCoins }}🪙</span>
        <span class="fs-3 mx-5">Your Power: {{ yourPower }}💪</span>
        <!-- <span class="fs-3 mx-5">Your Level: {{ yourLevel }}</span> -->
        <div v-if="equipCheck">
          <div v-for="hero in heroes">
            <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="character-img">
            <p class="my-0 fs-4 bold">{{ hero.name }}: Lvl {{ hero.level }}</p>
            <div>
              <span class="my-0">Health: {{ hero.health }}/{{ hero.maxHealth }}</span>
              <span v-if="hero.healOverTimeCounter"> Healing ➕{{ hero.healOverTimeAmountHolder }} for
                {{ hero.healOverTimeCounter }} more rounds</span>
            </div>
            <!-- <div class="progress">
              <div :class="`progress-bar`" role="progressbar"
                :style="{ width: `${(hero.health / hero.maxHealth) * 100}%` }">
              </div>
            </div> -->

            <!-- can also just disable button, but i like my solution better -->
            <!-- <button :disabled="hero.hasAttacked" class="btn btn-primary" @click="heroAttack(hero)">
                🪥 {{ hero.damage }}</button> -->

            <!-- SECTION hero attack & special move buttons -->
            <button v-if="!hero.hasAttacked && !hero.dead" class="btn btn-primary" @click="heroAttack(hero)">
              🪥 {{ hero.damage }}</button>

            <button v-if="hero.healer && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="specialMoveHeal(hero)">Pay 💪{{ hero.healCost }} to heal ➕{{ hero.healAmount }}</button>

            <button v-if="hero.healerOverTime && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="setHealOverTime(hero)">Pay 💪{{ hero.healOverTimeCost }} to heal ➕{{ hero.healOverTimeAmount }}
              for {{ hero.healOverTimeDuration }} rounds</button>

            <button v-if="hero.shield && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="activateShield(hero)">Pay 💪{{ hero.shieldCost
              }} to block all damage next round</button>

            <button v-if="hero.overcharge && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="overchargeSpecialUsed(hero)">Increase power by {{ hero.overchargeAmount }}</button>

            <button v-if="hero.striker && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="strikeAttack(hero)">Pay 💪{{ hero.strikeCost }} for 🧼{{ hero.strikeAmount }} damage</button>

            <button v-if="hero.kamikaze && !hero.hasAttacked && !hero.dead" class="btn btn-secondary"
              @click="kamikazeAttack(hero)">Pay 💪{{ hero.kamikazePowerCost }} & -{{ hero.kamikazeHealthCost }} health
              to deal {{ hero.kamikazeDamage }}</button>

            <!-- NOTE I was going to make it so the player can heal here but I think it would put on more strategic pressure if they can only do that in the store page, once the player can only access it between bosses -->
            <!-- <button v-if="!hero.hasAttacked && !hero.dead" class="btn btn-success">Heal</button> -->

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
        <div>
          <!-- SECTION boss UI indication of special moves being activated -->
          <p v-if="boss.strikerSpecialActivated">Charging up to deal +{{ boss.strikerDamage }} next turn</p>
          <p v-if="boss.healSpecialActivated">Charging up to heal {{ boss.healAmount }} next turn</p>
          <p v-if="boss.shieldSpecialActivated">Boss is immune to base attack damage</p>
          <p v-if="boss.kamikazeSpecialActivated">Charging up to deal {{ boss.kamikazeDamage }} at the cost of
            {{ boss.kamikazeHealthCost }} of its own life</p>
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
import { gameFunctionalityService } from '../services/GameFunctionalityService.js'
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
    const yourLevel = computed(() => {
      return AppState.playerLevel
    })


    function heroAttack(hero) {
      characterService.heroAttack(hero)
    }

    // NOTE end round works after being moved to the game functionality service but it broke quick attack
    function endRound() {
      gameFunctionalityService.endRound()
    }

    // FIXME 
    function quickAttack() {
      gameFunctionalityService.quickAttack()
    }

    function reviveCharacter(hero) {
      characterService.reviveCharacter(hero)
    }

    function specialMoveHeal(hero) {
      characterService.specialMoveHeal(hero)
    }

    function strikeAttack(hero) {
      characterService.strikeAttack(hero)
    }

    function setHealOverTime(hero) {
      characterService.setHealOverTime(hero)
    }

    function activateShield(hero) {
      characterService.activateShield(hero)
    }

    function overchargeSpecialUsed(hero) {
      characterService.overchargeSpecialUsed(hero)
    }

    function kamikazeAttack(hero) {
      characterService.kamikazeAttack(hero)
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
      strikeAttack,
      setHealOverTime,
      activateShield,
      overchargeSpecialUsed,
      yourLevel,
      kamikazeAttack
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