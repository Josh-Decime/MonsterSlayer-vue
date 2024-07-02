import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";

class MonstersService {
    // TODO I need a check to see if all players all dead. something like if # of for each equippedHeroes .dead  == equippedHero.length
    // TODO if all the players characters die then the store opens up again 

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
        AppState.activeMonster.sicknessDamage = Math.round(AppState.activeMonster.sicknessDamage * baseGrowth)
        AppState.monsters.push(AppState.activeMonster)
        AppState.activeMonster = AppState.monsters.shift()
        AppState.playerLevel++
        console.log('the new boss is:', AppState.activeMonster)
        AppState.storeAvailable = true
        console.log('store available:', AppState.storeAvailable)
    }


    // TODO check if heroes are dead, if they are don't attack
    // NOTE I could make check critical a function & I could run it through after the boss move has been decided so critical can affect special moves. I could also pass damage through them which might fix the extra damage issue Iv been having. Would be a bit of a reworking but might be a better way of doing things
    bossAttack() {
        // NOTE when boss attacks player can no longer access the store until the boss is killed (or players team dies, to be added later)
        AppState.storeAvailable = false
        console.log('store available:', AppState.storeAvailable)
        // SECTION reset single application effects
        AppState.activeMonster.kamikazeDamageApplied = false

        // SECTION determine damage
        AppState.equippedCharacters.forEach(hero => {
            if (!hero.dead) {
                let damage = AppState.activeMonster.damage

                const critChance = AppState.activeMonster.critChance
                const critMultiplier = AppState.activeMonster.critMultiplier
                const isCriticalHit = Math.random() < critChance

                if (isCriticalHit) {
                    damage *= critMultiplier
                    damage = Math.round(damage)
                    console.log('***Boom! Critical hit! Damage:', damage)
                }
                // NOTE boss deals more damage if player doesn't have a full team
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
                // SECTION boss makes their move
                this.bossesMoveThisTurn(hero, damage)

            }
        })
        // SECTION determines if special is activated for next round
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

        if (AppState.activeMonster.sicknessUsed) {
            AppState.activeMonster.sicknessSpecialActivated = false
        }
        if (AppState.activeMonster.sickness) {
            const sicknessActivated = Math.random() < AppState.activeMonster.sicknessActivationChance
            if (sicknessActivated) {
                AppState.activeMonster.sicknessSpecialActivated = true
                console.log('*** SICKNESS MOVE ACTIVATED!')
            }
        }
    }

    // NOTE don't forget to pass hero into your function if you need to deal damage
    bossesMoveThisTurn(hero, damage) {
        // NOTE if the heroes shield is active this should end the bosses turn without dealing damage
        // TODO I built in a block in each of the damage dealing specials that is supposed to make it so they don't deal damage. If this works after extensive testing then I am free to just get rid of those since they don't work anyway
        //   FIXME when I used shield against a kamikaze attack it blocked it instead of waiting till I ran out of player power. The only change I made was that it doesn't try to pass "damage" (should change that to baseDamage) through. Im not sure how that would have fixed it. Now I am having that waiting till I run out of player power on the sickness turn counter
        if (hero.shieldActive) {
            hero.shieldActive = false
            console.log('attack blocked')
            return
        }

        const strikerActivated = AppState.activeMonster.strikerSpecialActivated
        const healActivated = AppState.activeMonster.healSpecialActivated
        const shieldActivated = AppState.activeMonster.shieldSpecialActivated
        const kamikazeActivated = AppState.activeMonster.kamikazeSpecialActivated
        const setSicknessActivated = AppState.activeMonster.sicknessSpecialActivated
        const sicknessTurnCounter = AppState.activeMonster.sicknessTurnCounter

        let specialMoveUsed = false

        if (strikerActivated) {
            this.bossStrikerSpecialAttack(hero, damage)
            specialMoveUsed = true
        }
        // FIXME the amount of health the bos heals for is going to run for every hero the player has equipped because the bossMoveThisTurn runs for each hero
        if (healActivated) {
            this.bossHealerSpecialMove()
            specialMoveUsed = true
        }

        if (shieldActivated) {
            this.bossShieldSpecialMove()
            specialMoveUsed = true
        }


        if (kamikazeActivated) {
            // NOTE it ran 3 times so I cant use this to deal damage from kamikaze. I don't have any more time today so I cant fix it today but at least i figured out what was wrong
            console.log('test to see if this runs once or 3 times')
            this.bossKamikazeSpecialMove(hero)
            specialMoveUsed = true
        }

        if (setSicknessActivated) {
            this.bossSetSicknessMove(hero, damage)
            specialMoveUsed = true
        }

        if (sicknessTurnCounter > 0) {
            this.bossSicknessContinuousEffect(hero, damage)
            specialMoveUsed = true
        }


        if (!specialMoveUsed) {
            console.log('*Base attack triggered!')
            hero.health -= damage
        }

    }

    bossStrikerSpecialAttack(hero) {
        if (!hero.shieldActive) {
            hero.health -= AppState.activeMonster.strikerDamage
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

    bossKamikazeSpecialMove(hero) {
        if (!hero.shieldActive) {
            hero.health -= AppState.activeMonster.kamikazeDamage
            // NOTE fixing the health turning NaN was simple enough, I didn't pass damage through to this function so it didn't have access, oops.. this attack does so much damage tho I don't think it should deal their base damage on top of that, so I'll just remove it
        }
        if (!AppState.activeMonster.kamikazeDamageApplied) {
            AppState.activeMonster.health -= AppState.activeMonster.kamikazeHealthCost
        }
        AppState.activeMonster.kamikazeUsed = true
        AppState.activeMonster.kamikazeDamageApplied = true
    }

    // NOTE after it is applied then it ticks the continuous effect so I removed the damage & subtracting the turn counter because that is immediately applied from the continuous effect
    // NOTE it is counting down properly & dealing the sickness damage, but it isn't adding the base damage ( like it usually does even when i don't want it to)
    // TODO I need to fix when it does & doesn't add the base damage to a special attack
    bossSetSicknessMove(hero, damage) {
        if (!hero.shieldActive) {
            // hero.health -= AppState.activeMonster.sicknessDamage
            AppState.activeMonster.sicknessTurnCounter = AppState.activeMonster.sicknessDuration
            hero.health -= damage
            // AppState.activeMonster.sicknessTurnCounter--
            console.log('initial sickness is set, counter is at:', AppState.activeMonster.sicknessTurnCounter)
        }
        AppState.activeMonster.sicknessUsed = true
    }

    // NOTE damage shouldn't affect hero if shield is active but should always tick down the turn counter 
    // FIXME it is inconsistent of if the sickness damage is applied
    // FIXME if the players shield is activated then it doesn't count down the turn counter, it just waits until you run out of player power & can't shield anymore
    bossSicknessContinuousEffect(hero, damage) {
        if (!hero.shieldActive) {
            hero.health -= AppState.activeMonster.sicknessDamage
            hero.health -= damage
        }
        AppState.activeMonster.sicknessTurnCounter--
        console.log('sickness continuous effect is applied, counter is at:', AppState.activeMonster.sicknessTurnCounter)
    }




}

export const monsterService = new MonstersService()