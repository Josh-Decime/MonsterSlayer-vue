import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import Pop from "../utils/Pop.js";


class CharactersService {

    // NOTE some of these should be moved to a new service for game controls, so the character service is not so full of functions that are about game functionality rather than the characters
    equipTeam() {
        AppState.equippedCharacters.length = 0
        AppState.Characters.forEach(person => {
            if (person.equip == true)
                AppState.equippedCharacters.push(person)
        })
        console.log('Equipped characters', AppState.equippedCharacters)
    }


    heroAttack(hero) {
        if (!hero.hasAttacked && !hero.dead) {
            AppState.activeMonster.health -= hero.damage
            const characterToUpdate = AppState.Characters.find(
                character => character.name == hero.name
            )
            characterToUpdate.hasAttacked = true
        } else {
            Pop.error('Can not attack')
        }
    }


    endRound() {
        let canStillAttack = false
        AppState.equippedCharacters.forEach(person => {
            if (!person.hasAttacked && !person.dead) {
                canStillAttack = true
            }
        })
        if (canStillAttack) {
            // NOTE I would like to request confirmation from player so they can end the round without attacking if they want for some reason. This works for now, not a high priority.
            Pop.error('Someone on your team has not attacked')
        } else {
            AppState.equippedCharacters.forEach(person => {
                if (!person.dead) {
                    person.health -= AppState.activeMonster.damage
                }
                person.hasAttacked = false
                if (person.health <= 0) {
                    person.dead = true
                    person.health = 0
                    console.log('died:', person)
                }

                this.turnCounterHandler()
            })
            // NOTE I need a better way to represent the round successfully ended. This is a placeholder
            Pop.success('Next round')
        }
        if (AppState.playerPower < 100) {
            AppState.playerPower += 10
        }
    }

    turnCounterHandler() {
        // console.log('handling turn counter')
        AppState.equippedCharacters.forEach(hero => {
            if (hero.healOverTimeCounter >= 1) {
                hero.healOverTimeCounter--
            }
        })
    }

    quickAttack() {
        AppState.equippedCharacters.forEach(person => {
            if (!person.hasAttacked) {
                this.heroAttack(person)
                // console.log('this hero attacked:', person)
            }
        })
        this.endRound()
    }

    // SECTION AboutPage AKA store page
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
        // FIXME it is equipping characters even if you dont have enough money to purchase them. i added the && line but that didnt fix it yet. Im going to disable the button if you dont have enough money, I planned on doing that anyway & it will be a simple fix. 
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
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )
        if (AppState.playerCoins >= characterToUpdate.upgradeCost) {
            AppState.playerCoins -= characterToUpdate.upgradeCost
            characterToUpdate.level++
            characterToUpdate.maxHealth = Math.round(characterToUpdate.maxHealth * 1.5)
            characterToUpdate.health = characterToUpdate.maxHealth
            characterToUpdate.damage = Math.round(characterToUpdate.damage * 1.5)
            characterToUpdate.upgradeCost = Math.round(characterToUpdate.upgradeCost * 1.5)
            characterToUpdate.reviveCost = Math.round(characterToUpdate.reviveCost * 2)
            characterToUpdate.healAmount = Math.round(characterToUpdate.healAmount * 1.5)
            characterToUpdate.strikeAmount = Math.round(characterToUpdate.strikeAmount * 1.5)
        } else {
            Pop.error('You need more coins to upgrade that character!')
        }
    }

    reviveCharacter(hero) {
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )

        if (AppState.playerCoins >= characterToUpdate.reviveCost) {
            AppState.playerCoins -= characterToUpdate.reviveCost
            characterToUpdate.health = characterToUpdate.maxHealth
            characterToUpdate.dead = false
        }
    }

    specialMoveHeal(hero) {
        const characterToUpdate = AppState.Characters.find(
            character => character.name == hero.name
        )
        if (AppState.playerPower >= characterToUpdate.healCost) {
            AppState.playerPower -= characterToUpdate.healCost
            AppState.equippedCharacters.forEach(person => {
                if (!person.dead) {
                    person.health += characterToUpdate.healAmount
                }
            })
            characterToUpdate.hasAttacked = true
        } else {
            Pop.error('Not enough power')
        }
    }

    setHealOverTime(hero) {
        if (AppState.playerPower >= hero.healOverTimeCost) {
            console.log('test')
        }
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




}

export const characterService = new CharactersService()