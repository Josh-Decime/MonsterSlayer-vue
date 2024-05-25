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
    // TODO I need to make it so the player can only visit the store between bosses, if they can go to the store any time & just swap out their team then I cant pre-announce boss special moves or the player can just un-equip their team & equip a low level they don't care about to take the blow... alternatively I could just make it so when the boss activates a special you cant un-equip your team.. but the first option makes more sense & makes it feel more strategic, like when you kill a boss matters. 

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
                // TODO add special effect if it was activated last round
                // person.health -= damage
                this.bossesMoveThisTurn(person, damage)

            }
        })
        this.determineBossSpecialActivation()
    }

    determineBossSpecialActivation() {
        // NOTE if striker attacked this last turn reset strikerSpecialActivated back to false so they don't keep using it over & over. I couldn't reset it when the attack is made because it iterates over each players character so if it reset after the attack it would only attack once
        if (AppState.strikerAttacked) {
            // FIXME this doesn't seem to be working, once striker activates they do 3 damage every time
            AppState.activeMonster.strikerSpecialActivated = false
        }
        if (AppState.activeMonster.striker) {
            const strikerActivated = Math.random() < AppState.activeMonster.strikerActivateChance
            if (strikerActivated) {
                AppState.activeMonster.strikerSpecialActivated = true
                console.log('*** STRIKER MOVE ACTIVATED!')
            }
        }
    }

    bossesMoveThisTurn(person, damage) {
        if (AppState.activeMonster.strikerSpecialActivated) {
            this.bossStrikerSpecialAttack(person)
        }

        else {
            person.health -= damage
        }
    }

    bossStrikerSpecialAttack(person) {
        person.health -= AppState.activeMonster.strikerDamage
        AppState.activeMonster.strikerAttacked = true
    }




}

export const monsterService = new MonstersService()