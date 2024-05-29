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
        AppState.activeMonster.strikerDamage = Math.round(AppState.activeMonster.strikerDamage * 1.5)
        AppState.activeMonster.healAmount = Math.round(AppState.activeMonster.healAmount * 1.5)
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

                this.bossesMoveThisTurn(person, damage)

            }
        })
        this.determineBossSpecialActivation()
    }

    determineBossSpecialActivation() {
        if (AppState.activeMonster.strikerAttacked) {
            AppState.activeMonster.strikerSpecialActivated = false
        }
        if (AppState.activeMonster.striker) {
            const strikerActivated = Math.random() < AppState.activeMonster.strikerActivateChance
            if (strikerActivated) {
                AppState.activeMonster.strikerSpecialActivated = true
                console.log('*** STRIKER MOVE ACTIVATED!')
            }
        }

        if (AppState.activeMonster.healUsed) {
            AppState.activeMonster.healSpecialActivated = false
        }
        if (AppState.activeMonster.healer) {
            const healActivated = Math.random() < AppState.activeMonster.healActivateChance
            if (healActivated) {
                AppState.activeMonster.healSpecialActivated = true
                console.log('*** HEALER MOVE ACTIVATED')
            }
        }

        if (AppState.activeMonster.shieldUsed) {
            AppState.activeMonster.shieldSpecialActivated = false
        }
        if (AppState.activeMonster.shield) {
            const shieldActivated = Math.random() < AppState.activeMonster.shieldActivateChance
            if (shieldActivated) {
                AppState.activeMonster.shieldSpecialActivated = true
                console.log('*** SHIELD MOVE ACTIVATED!')
            }
        }
    }

    bossesMoveThisTurn(person, damage) {
        if (AppState.activeMonster.strikerSpecialActivated) {
            this.bossStrikerSpecialAttack(person)
        }

        if (AppState.activeMonster.healSpecialActivated) {
            this.bossHealerSpecialMove()
        }

        if (AppState.activeMonster.shieldSpecialActivated) {
            this.bossShieldSpecialMove()
        }

        // NOTE this is so if the player uses their shield ability the boss wont deal damage. Any damage special needs modified to not deal damage when players shield is active
        if (person.shieldActive) {
            person.shieldActive = false
            console.log('attack blocked')
        }

        // FIXME it is always dealing damage even if specials are active, it is supposed to be if-else. I still want it to do damage when some of the specials are activated, but I should choose which ones can still deal damage, it shouldn't attack every time
        else {
            person.health -= damage
        }
    }

    bossStrikerSpecialAttack(person) {
        if (!person.shieldActive) {
            person.health -= AppState.activeMonster.strikerDamage
        }
        AppState.activeMonster.strikerAttacked = true
    }

    bossHealerSpecialMove() {
        AppState.activeMonster.health += AppState.activeMonster.healAmount
        if (AppState.activeMonster.health > AppState.activeMonster.maxHealth) {
            AppState.activeMonster.health = AppState.activeMonster.maxHealth
        }
        AppState.activeMonster.healUsed = true
    }

    bossShieldSpecialMove() {
        AppState.activeMonster.shieldUsed = true
    }




}

export const monsterService = new MonstersService()