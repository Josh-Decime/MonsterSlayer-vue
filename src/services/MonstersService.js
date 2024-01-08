import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";

class MonstersService {

    // test damaging the boss
    damageBoss(damage) {
        AppState.activeMonster.health -= damage
    }

    payPlayer() {
        console.log('player coins before:', AppState.playerCoins)
        AppState.playerCoins += AppState.activeMonster.coins
        console.log('player is paid:', AppState.playerCoins)
    }


}

export const monsterService = new MonstersService()