import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";
import Pop from "../utils/Pop.js";


class CharactersService {

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





}

export const characterService = new CharactersService()