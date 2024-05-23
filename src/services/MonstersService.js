import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";

class MonstersService {

    killBoss() {
        console.log('killing the boss')
        AppState.activeMonster.level++
        AppState.activeMonster.maxHealth = Math.round(AppState.activeMonster.maxHealth * 1.5)
        AppState.activeMonster.health = AppState.activeMonster.maxHealth
        AppState.activeMonster.damage = Math.round(AppState.activeMonster.damage * 1.5)
        AppState.activeMonster.coins = Math.round(AppState.activeMonster.coins * 1.5)
        AppState.monsters.push(AppState.activeMonster)
        AppState.activeMonster = AppState.monsters.shift()
        console.log('the new boss is:', AppState.activeMonster)
    }

    payPlayer() {
        console.log('player coins before:', AppState.playerCoins)
        AppState.playerCoins += AppState.activeMonster.coins
        console.log('player is paid:', AppState.playerCoins)
    }

    bossAttack() {
        AppState.equippedCharacters.forEach(person => {
            if (!person.dead) {
                let damage = AppState.activeMonster.damage

                const critChance = AppState.activeMonster.critChance
                const critMultiplier = AppState.activeMonster.critMultiplier
                const isCriticalHit = Math.random() < critChance

                if (isCriticalHit) {
                    damage *= critMultiplier
                    damage = Math.round(damage)
                    console.log('***Boom! Critical hit! Damage:', damage)
                }

                person.health -= damage
            }
        })
    }




}

export const monsterService = new MonstersService()