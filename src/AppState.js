import { reactive } from 'vue'
import { Monster } from './models/Monster.js'
import { Character } from './models/Character.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},



  monsters: [
    new Monster({
      name: 'Grimy Gus',
      img: 'src/assets/img/GrimyGus.png',
      damage: 1,
      health: 25,
      maxHealth: 25,
      level: 1,
      coins: 100,
      striker: true,
      strikerDamage: 3,
      strikerActivateChance: 0.25,
    }),
    new Monster({
      name: 'Fungal Fred',
      img: 'src/assets/img/FungalFred.png',
      damage: 2,
      health: 50,
      maxHealth: 50,
      level: 1,
      coins: 150,
      healer: true,
      healAmount: 10,
      healActivateChance: 0.15,
    }),
    new Monster({
      name: 'Cold Carl',
      img: 'src/assets/img/ColdCarl.png',
      damage: 3,
      health: 75,
      maxHealth: 75,
      level: 1,
      coins: 200,
      shield: true,
      shieldActivateChance: .2,
    }),
    new Monster({
      name: 'Tick Terry',
      img: 'src/assets/img/TickTerry.png',
      damage: 4,
      health: 100,
      maxHealth: 100,
      level: 1,
      coins: 250,
      kamikaze: true,
      kamikazeHealthCost: 20,
      kamikazeDamage: 20,
      kamikazeActivateChance: .05,
    }),
    new Monster({
      name: 'Influenza Phil',
      img: 'src/assets/img/InfluenzaPhil.png',
      damage: 5,
      health: 150,
      maxHealth: 150,
      level: 1,
      coins: 300,
      sickness: true,
      sicknessDamage: 2,
      sicknessDuration: 3,
      sicknessActivationChance: .1,
    }),
  ],
  /**@type{Monster} */
  activeMonster: null,

  Characters: [
    new Character({
      name: 'Mr. Kleen',
      img: 'src/assets/img/MrKleen.png',
      damage: 5,
      health: 50,
      maxHealth: 50,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      shield: true,
      shieldCost: 40,
    }),
    new Character({
      name: 'Bell',
      img: 'src/assets/img/Bell.png',
      damage: 7,
      health: 38,
      maxHealth: 38,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      healer: true,
      healAmount: 5,
      healCost: 50,
    }),
    new Character({
      name: 'Dorthy',
      img: 'src/assets/img/Dorthy.png',
      damage: 7,
      health: 38,
      maxHealth: 38,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      healerOverTime: true,
      healOverTimeAmount: 2,
      healOverTimeCost: 60,
      healOverTimeDuration: 3,
    }),
    new Character({
      name: 'Jack',
      img: 'src/assets/img/Jack.png',
      damage: 5,
      health: 50,
      maxHealth: 50,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      overcharge: true,
      overchargeAmount: 10,
    }),
    new Character({
      name: 'Monii',
      img: 'src/assets/img/Monii.png',
      damage: 10,
      health: 25,
      maxHealth: 25,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      // striker: true,
      // strikeAmount: 17,
      // strikeCost: 50,
      kamikaze: true,
      kamikazePowerCost: 50,
      kamikazeHealthCost: 5,
      kamikazeDamage: 25,
    }),
    new Character({
      name: 'Walter',
      img: 'src/assets/img/Walter.png',
      damage: 10,
      health: 25,
      maxHealth: 25,
      level: 1,
      purchasePrice: 250,
      unlocked: false,
      equip: false,
      upgradeCost: 100,
      hasAttacked: false,
      reviveCost: 100,
      striker: true,
      strikeAmount: 15,
      strikeCost: 30,
    }),
  ],

  /**@type{Character[]} */
  equippedCharacters: [],

  // NOTE this is the coins you should have
  playerCoins: 250,
  // NOTE testing coins
  // playerCoins: 2500,
  playerPower: 0,
  // TODO playerLevel name should be changed to bossesDefeated
  playerLevel: 0,


  storeAvailable: true,
  teamDied: false,


  // SECTION player special moves
  skipBossUnlocked: false,
  skipBossCost: 100,







})
