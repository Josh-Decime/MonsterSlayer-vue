import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";

class MonstersService {

    // NOTE when adding a new move for the boss:
    // determineBossSpecialActivation: (if used, active = false) checks if it was used last round & resets it before checking if it should be activated this turn. If it is activated then it will be used next turn when  bossesMoveThisTurn runs
    //  bossesMoveThisTurn: does a check to see if that special is activated then runs the function that implements the special move
    // Write your new function for the move 
    // NOTE if the attack deals damage don't forget if(!hero.shieldActive) around the damage so it work affect shielded heros
    // Don't forget to increase any numbers that should scale in the killBoss function
    // Add UI indication for it being active, in HomePage

    killBoss() {
        console.log('killing the boss')
        let slowGrowth = 1.2
        let baseGrowth = 1.5
        AppState.activeMonster.level++
        AppState.activeMonster.maxHealth = Math.round(AppState.activeMonster.maxHealth * baseGrowth)
        AppState.activeMonster.health = AppState.activeMonster.maxHealth
        AppState.activeMonster.damage = Math.round(AppState.activeMonster.damage * baseGrowth)
        AppState.activeMonster.coins = Math.round(AppState.activeMonster.coins * slowGrowth)
        AppState.activeMonster.strikerDamage = Math.round(AppState.activeMonster.strikerDamage * baseGrowth)
        AppState.activeMonster.healAmount = Math.round(AppState.activeMonster.healAmount * baseGrowth)
        AppState.activeMonster.kamikazeDamage = Math.round(AppState.activeMonster.kamikazeDamage * baseGrowth)
        AppState.activeMonster.kamikazeHealthCost = Math.round(AppState.activeMonster.kamikazeHealthCost * baseGrowth)
        AppState.monsters.push(AppState.activeMonster)
        AppState.activeMonster = AppState.monsters.shift()
        AppState.playerLevel++
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
                // NOTE I realized this previous todo didn't get committed, I just solved the problem, so I undid deleting it so it will be committed next time to show my thought process of why I added that.
                // TODO modify damage to be increased if you don't have a full team? Right now, in the current balance just having 1 character is way more powerful. If you put all your coins into 1 character they get to the point they 1-3 shot all the bosses
                if (AppState.equippedCharacters.length == 1) {
                    console.log('recognizing only one character is equipped')
                    console.log('damage before multiplier:', damage)
                    damage = Math.round(damage * 1.5)
                    console.log('damage after multiplier:', damage)

                }
                if (AppState.equippedCharacters.length == 2) {
                    console.log('recognizing 2 characters are equipped')
                    console.log('damage before multiplier:', damage)
                    damage = Math.round(damage * 1.2)
                    console.log('damage after multiplier:', damage)
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

        if (AppState.activeMonster.kamikazeUsed) {
            AppState.activeMonster.kamikazeSpecialActivated = false
        }
        if (AppState.activeMonster.kamikaze) {
            const kamikazeActivated = Math.random() < AppState.activeMonster.kamikazeActivateChance
            if (kamikazeActivated) {
                AppState.activeMonster.kamikazeSpecialActivated = true
                console.log('*** KAMIKAZE MOVE ACTIVATED')
            }
        }
    }

    // TODO change person to hero & make sure nothing broke
    // NOTE don't forget to pass person into your function if you need to deal damage
    bossesMoveThisTurn(person, damage) {
        if (AppState.activeMonster.strikerSpecialActivated) {
            this.bossStrikerSpecialAttack(person)
        }
        // FIXME boss is double healing
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

        if (AppState.activeMonster.kamikazeSpecialActivated) {
            this.bossKamikazeSpecialMove(person)
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

    bossKamikazeSpecialMove(person) {
        // FIXME player still took damage even when their shield was activated
        if (!person.shieldActive) {
            person.health -= AppState.activeMonster.kamikazeDamage
        }
        // FIXME for some reason it is dealing more damage to the boss than the cost. It seems like it adds the bosses base attack damage to it, but the hero doesn't take that base attack damage like they usually do so somehow its getting mixed up. This must be related to that bug that the hero always takes the damage but it got flipped... so bizarre 
        AppState.activeMonster.health -= AppState.activeMonster.kamikazeHealthCost
        AppState.activeMonster.kamikazeUsed = true
    }




}

export const monsterService = new MonstersService()