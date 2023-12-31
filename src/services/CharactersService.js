import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import Pop from "../utils/Pop.js";


class CharactersService {

    // SECTION HomePage AKA battle page
    equipTeam() {
        AppState.equippedCharacters.length = 0
        AppState.Characters.forEach(person => {
            if (person.equip == true)
                AppState.equippedCharacters.push(person)
        })
        console.log('Equipped characters', AppState.equippedCharacters)
    }


    heroAttack(hero) {
        if (hero.hasAttacked == false) {
            AppState.activeMonster.health -= hero.damage
            const characterToUpdate = AppState.Characters.find(
                character => character.name == hero.name
            )
            characterToUpdate.hasAttacked = true
        } else {
            Pop.error('that character has already attacked this round')
        }
    }


    endRound() {
        let canStillAttack = false
        AppState.equippedCharacters.forEach(person => {
            if (!person.hasAttacked) {
                canStillAttack = true
            }
        })
        if (canStillAttack) {
            // NOTE I would like to request confirmation from player so they can end the round without attacking if they want for some reason. This works for now, not a high priority.
            Pop.error('Someone on your team has not attacked')
        } else {
            AppState.equippedCharacters.forEach(person => {
                person.health -= AppState.activeMonster.damage
                person.hasAttacked = false
            })
            // NOTE I need a better way to represent the round successfully ended. This is a placeholder
            Pop.success('Next round')
        }
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
        characterToUpdate.equip = false
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
        } else {
            Pop.error('You need more coins to upgrade that character!')
        }
    }

    // NOTE build a function to quick attack, all characters attack at the same time & it auto ends round



}

export const characterService = new CharactersService()