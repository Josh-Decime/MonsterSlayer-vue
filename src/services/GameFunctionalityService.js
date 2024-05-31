import { AppState } from "../AppState.js"
import { Character } from "../models/Character.js"
import { Monster } from "../models/Monster.js"
import { characterService } from "./CharactersService.js"
import { monsterService } from "./MonstersService.js"
import Pop from "../utils/Pop.js"

class GameFunctionalityService {

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
            monsterService.bossAttack()
            AppState.equippedCharacters.forEach(person => {
                person.hasAttacked = false
                if (person.health <= 0) {
                    person.dead = true
                    person.health = 0
                    console.log('died:', person)
                }
                console.log('hero:', person)
            })
            this.turnCounterHandler()

            // NOTE I need a better way to represent the round successfully ended. This is a placeholder
            Pop.success('Next round')
        }
        if (AppState.playerPower < 100) {
            AppState.playerPower += 10
        }
    }

    turnCounterHandler() {
        console.log('handling turn counter')
        AppState.equippedCharacters.forEach(hero => {
            console.log('hero healOverTimeCounter', hero.healOverTimeCounter)
            if (hero.healOverTimeCounter >= 1) {
                characterService.healOverTimeContinuousEffect(hero)
            }
        })
    }

}

export const gameFunctionalityService = new GameFunctionalityService()