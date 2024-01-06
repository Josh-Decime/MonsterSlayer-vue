<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-6">
        <h3>Your Coins: {{ yourCoins }}</h3>
        <div v-if="equipCheck">
          <div v-for="hero in heroes">
            <img v-if="hero.img" :src="hero.img" :alt="hero.name" class="character-img">
            <h3>{{ hero.name }}: {{ hero.health }}/{{ hero.maxHealth }}</h3>
            <!-- <p class="my-0">Health: {{ hero.health }} / {{ hero.maxHealth }}</p> -->
            <!-- <p class="my-0">Damage: {{ hero.damage }}</p> -->
            <!-- <div class="progress">
              <div :class="`progress-bar`" role="progressbar"
                :style="{ width: `${(hero.health / hero.maxHealth) * 100}%` }">
              </div>
            </div> -->
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
        <!-- NOTE test attacks to be removed once combat functionality works -->
        <button v-for="attack in attacks" class="btn btn-primary col-2" @click="damageBoss(attack.damage)">
          {{ attack.emoji }}{{ attack.damage }}</button>
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

    const heroes = computed(() => {
      return AppState.equippedCharacters.map(character => {
        return {
          name: character.name,
          img: character.img,
          damage: character.damage,
          health: character.health,
          maxHealth: character.maxHealth,
          hasAttacked: character.hasAttacked,
        }
      })
    })

    function equipTeam() {
      AppState.equippedCharacters.length = 0
      AppState.Characters.forEach(person => {
        if (person.equip == true)
          AppState.equippedCharacters.push(person)
      })
      console.log('Equipped characters', AppState.equippedCharacters)
    }
    onMounted(() => {
      equipTeam()
    })
    computed(() => {
      equipTeam()
    })


    function damageBoss(damage) {
      AppState.activeMonster.health -= damage
    }

    function heroAttack(hero) {
      if (hero.hasAttacked == false) {
        AppState.activeMonster.health -= hero.damage
        const characterToUpdate = AppState.Characters.find(
          character => character.name == hero.name
        )
        characterToUpdate.hasAttacked = true
      } else {
        Pop.error('that character has already attacked this round')
      }

    }

    function payPlayer() {
      console.log('player coins before:', AppState.playerCoins)
      console.log('boss coins:', boss.coins)
      AppState.playerCoins += AppState.activeMonster.coins
      console.log('player is paid:', AppState.playerCoins)
    }



    function killBoss() {
      console.log('killing the boss')
      payPlayer()
      AppState.activeMonster.level++
      AppState.activeMonster.maxHealth = Math.round(AppState.activeMonster.maxHealth * 1.5)
      AppState.activeMonster.health = AppState.activeMonster.maxHealth
      AppState.activeMonster.damage = Math.round(AppState.activeMonster.damage * 1.5)
      AppState.activeMonster.coins = Math.round(AppState.activeMonster.coins * 1.5)
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

    const yourCoins = computed(() => {
      return AppState.playerCoins
    })

    const equipCheck = computed(() => {
      const areEquipped = AppState.equippedCharacters
      return areEquipped.length > 0
    })

    function endRound() {
      AppState.equippedCharacters.forEach(person => {
        // console.log('boss damage', boss.damage)
        person.health -= AppState.activeMonster.damage
        // NOTE this is not working yet!
        if (person.hasAttacked == false) {
          Pop.confirm('Someone on your team has not attacked, are you sure you want to end your turn?')
        }
        person.hasAttacked = false
      })
      Pop.success('Next round')
    }



    const attacks = [{ emoji: '🪥', damage: 5 }, { emoji: '🧹', damage: 10 }, { emoji: '🧼', damage: 20 }]

    console.log('👹 active monster:', AppState.activeMonster)


    return {
      attacks,
      heroAttack,
      damageBoss,
      boss,
      equipTeam,
      heroes,
      yourCoins,
      equipCheck,
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