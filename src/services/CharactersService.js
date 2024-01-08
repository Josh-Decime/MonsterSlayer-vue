import { AppState } from "../AppState.js";
import { Character } from "../models/Character.js";


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




}

export const characterService = new CharactersService()