import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import Pop from "../utils/Pop.js";
import { monsterService } from "./MonstersService.js";


class CharactersService {

    // SECTION base functionality
    equipTeam() {
        AppState.equippedCharacters.length = 0
        AppState.Characters.forEach(hero => {
            if (hero.equip == true)
                AppState.equippedCharacters.push(hero)
        })
        console.log('Equipped characters', AppState.equippedCharacters)
    }


    heroAttack(hero) {
        if (!hero.hasAttacked && !hero.dead) {
            // NOTE if the boss has their shield activated then the player can't deal standard attack damage. I'll allow special moves to still deal damage
            if (!AppState.activeMonster.shieldSpecialActivated) {
                AppState.activeMonster.health -= hero.damage
            }
            hero.hasAttacked = true
            console.log('attacking hero:', hero)
        } else {
            Pop.error('Can not attack')
        }
    }

    capAtMaxHealth(hero) {
        if (hero.health > hero.maxHealth) {
            hero.health = hero.maxHealth
        }
    }

    // SECTION store page functions
    buyCharacter(hero) {
        if (AppState.playerCoins >= hero.purchasePrice) {
            const characterToUpdate = AppState.Characters.find(
                character => character.name == hero.name
            )
            AppState.playerCoins -= hero.purchasePrice
            characterToUpdate.unlocked = true
            console.log('you bought:', hero)
        } else {
            Pop.error('You do not have enough coins!')
        }
        if (AppState.equippedCharacters.length < 3 && AppState.playerCoins >= hero.purchasePrice)
            console.log('equip purchased character')
        this.equipCharacter(hero)
    }

    equipCharacter(hero) {
        if (AppState.equippedCharacters.length < 3) {
            const characterToUpdate = AppState.Characters.find(
                character => character.name == hero.name
            )
            characterToUpdate.equip = true
            AppState.equippedCharacters.push(hero)
            console.log('your team', AppState.equippedCharacters)
            console.log('hero added', hero)
        } else {
            Pop.error('Your team is full! Un-equip someone to make room first')
        }
    }

    unEquipCharacter(hero) {
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )
        if (!characterToUpdate.hasAttacked) {
            characterToUpdate.equip = false
        } else {
            Pop.error('This character made their move this turn & cant be unequipped until next round')
        }
    }

    upgradeCharacter(hero) {
        // NOTE now I can easily adjust the growth rate 
        let slowGrowth = 1.2
        let baseGrowth = 1.5
        let quickGrowth = 1.7
        let fastGrowth = 2
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )
        if (AppState.playerCoins >= characterToUpdate.upgradeCost) {
            AppState.playerCoins -= characterToUpdate.upgradeCost
            characterToUpdate.level++
            characterToUpdate.maxHealth = Math.round(characterToUpdate.maxHealth * baseGrowth)
            characterToUpdate.health = characterToUpdate.maxHealth
            characterToUpdate.damage = Math.round(characterToUpdate.damage * baseGrowth)
            // NOTE maybe increase upgrade cost scaling even more & add in health potions the player can buy
            characterToUpdate.upgradeCost = Math.round(characterToUpdate.upgradeCost * quickGrowth)
            characterToUpdate.potionCost = Math.round(characterToUpdate.potionCost * baseGrowth)
            characterToUpdate.reviveCost = Math.round(characterToUpdate.reviveCost * fastGrowth)
            characterToUpdate.healAmount = Math.round(characterToUpdate.healAmount * baseGrowth)
            characterToUpdate.healOverTimeAmount = Math.round(characterToUpdate.healOverTimeAmount * baseGrowth)
            characterToUpdate.strikeAmount = Math.round(characterToUpdate.strikeAmount * baseGrowth)
            characterToUpdate.kamikazeDamage = Math.round(characterToUpdate.kamikazeDamage * baseGrowth)
            characterToUpdate.kamikazeHealthCost = Math.round(characterToUpdate.kamikazeHealthCost * baseGrowth)
        } else {
            Pop.error('You need more coins to upgrade that character!')
        }
    }

    // TODO make revival cost more when the store is unavailable. Players will have to make a tough choice of if they should revive during battle or not.
    reviveCharacter(hero) {
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )

        let reviveCost = characterToUpdate.reviveCost

        // NOTE if the reviveCost multiplier is changed, it needs to be changed on the revive button on the HomePage too because that doesn't update automatically 
        if (!AppState.storeAvailable) {
            reviveCost = Math.round(reviveCost * 2)
        }

        if (AppState.playerCoins >= reviveCost) {
            AppState.playerCoins -= reviveCost
            characterToUpdate.health = characterToUpdate.maxHealth
            characterToUpdate.dead = false
            AppState.teamDied = false
        }
    }

    potionHealCharacter(hero) {
        if (AppState.playerCoins >= hero.potionCost) {
            AppState.playerCoins -= hero.potionCost
            hero.health = hero.maxHealth
        }
    }

    // SECTION special moves

    specialMoveHeal(hero) {
        if (AppState.playerPower >= hero.healCost) {
            AppState.playerPower -= hero.healCost
            AppState.equippedCharacters.forEach(heroToBeHealed => {
                if (!heroToBeHealed.dead) {
                    heroToBeHealed.health += hero.healAmount
                    this.capAtMaxHealth(heroToBeHealed)
                }
            })
            hero.hasAttacked = true
        } else {
            Pop.error('Not enough power')
        }
    }

    setHealOverTime(hero) {
        if (AppState.playerPower >= hero.healOverTimeCost) {
            AppState.playerPower -= hero.healOverTimeCost
            AppState.equippedCharacters.forEach(equippedHero => {
                if (!equippedHero.dead) {
                    equippedHero.healOverTimeCounter = hero.healOverTimeDuration
                    equippedHero.healOverTimeBy = hero.name
                    equippedHero.healOverTimeAmountHolder = hero.healOverTimeAmount
                    equippedHero.healOverTimeCounter--
                    equippedHero.health += hero.healOverTimeAmount
                    this.capAtMaxHealth(equippedHero)
                    console.log('hero effected by heal over time', equippedHero)
                }
            })
            hero.hasAttacked = true
        } else {
            Pop.error('Not enough power')
        }
    }
    // NOTE this is triggered by turnCounterHandler() in the GameFunctionalityService
    healOverTimeContinuousEffect(hero) {
        hero.healOverTimeCounter--
        hero.health += hero.healOverTimeAmountHolder
        this.capAtMaxHealth(hero)
        console.log('healing:', hero)
    }

    strikeAttack(hero) {
        if (!hero.hasAttacked && !hero.dead && AppState.playerPower >= hero.strikeCost) {
            AppState.activeMonster.health -= hero.strikeAmount
            const characterToUpdate = AppState.Characters.find(
                character => character.name == hero.name
            )
            characterToUpdate.hasAttacked = true
            AppState.playerPower -= hero.strikeCost
        } else {
            Pop.error('Can not attack')
        }
    }

    kamikazeAttack(hero) {
        if (!hero.hasAttacked && !hero.dead && AppState.playerPower >= hero.kamikazePowerCost) {
            AppState.activeMonster.health -= hero.kamikazeDamage
            hero.health -= hero.kamikazeHealthCost
            hero.hasAttacked = true
            AppState.playerPower -= hero.kamikazePowerCost
            if (hero.health <= 0) {
                hero.dead = true
                hero.health = 0
                console.log('died:', hero)
            }
        } else {
            Pop.error('Can not attack')
        }
    }


    activateShield(hero) {
        if (AppState.playerPower >= hero.shieldCost) {
            AppState.playerPower -= hero.shieldCost
            AppState.equippedCharacters.forEach(equippedHero => {
                equippedHero.shieldActive = true
            })
            hero.hasAttacked = true
        }
    }

    overchargeSpecialUsed(hero) {
        AppState.playerPower += hero.overchargeAmount
        hero.hasAttacked = true
    }




}

export const characterService = new CharactersService()