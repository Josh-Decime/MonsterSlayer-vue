import { AppState } from "../AppState.js"
import { Character } from "../models/Character.js"
import { Monster } from "../models/Monster.js"
import { characterService } from "./CharactersService.js"
import { monsterService } from "./MonstersService.js"
import Pop from "../utils/Pop.js"

class GameFunctionalityService {

    endRound() {
        let canStillAttack = false
        AppState.equippedCharacters.forEach(hero => {
            if (!hero.hasAttacked && !hero.dead) {
                canStillAttack = true
            }
        })
        if (canStillAttack) {
            // NOTE I would like to request confirmation from player so they can end the round without attacking if they want for some reason. This works for now, not a high priority.
            Pop.error('Someone on your team has not attacked')
        } else {
            monsterService.bossAttack()
            AppState.equippedCharacters.forEach(hero => {
                hero.hasAttacked = false
                if (hero.health <= 0) {
                    hero.dead = true
                    hero.health = 0
                    console.log('died:', hero)
                }
                console.log('hero:', hero)
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

    // NOTE maybe quick attack belongs back in the base functionality section of the character service, since it only deals with the character. The other 2 functions I have in here can involve the characters & monsters.
    quickAttack() {
        AppState.equippedCharacters.forEach(hero => {
            if (!hero.hasAttacked) {
                characterService.heroAttack(hero)
            }
        })
        this.endRound()
    }

    // NOTE once I implement it so the player can only access the store between bosses I will need something that recognizes if their full team dies. It could do let deadCharacters = 0; equippedCharacters.forEach{ if hero.dead, deadCharacters++} if equippedCharacters.length == deadCharacters, allowStoreAccess()
    // NOTE I did a test, playing it as if this was already implemented, only accessing the store between battles & I made it to boss 19 in the current balance. It was actually pretty difficult but I felt like I had strategic options, I think this is pretty good!

}

export const gameFunctionalityService = new GameFunctionalityService()