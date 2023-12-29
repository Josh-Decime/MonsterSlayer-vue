import { reactive } from 'vue'
import { Monster } from './models/Monster.js'

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
      level: 1
    }),
    new Monster({
      name: 'Fungal Fred',
      img: 'src/assets/img/FungalFred.png',
      damage: 10,
      health: 50,
      maxHealth: 50,
      level: 1
    }),
    new Monster({
      name: 'Cold Carl',
      img: 'src/assets/img/ColdCarl.png',
      damage: 15,
      health: 75,
      maxHealth: 75,
      level: 1
    }),
    new Monster({
      name: 'Tick Terry',
      img: 'src/assets/img/TickTerry.png',
      damage: 25,
      health: 100,
      maxHealth: 100,
      level: 1
    }),
    new Monster({
      name: 'Influenza Phil',
      img: 'src/assets/img/InfluenzaPhil.png',
      damage: 30,
      health: 150,
      maxHealth: 150,
      level: 1
    }),
  ],

  // let activeMonster = monsters.shift()

  /**@type{Monster} */
  activeMonster: null,

  // setActiveMonster(){

  // }


})
