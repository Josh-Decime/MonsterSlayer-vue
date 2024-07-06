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
        this.checkIfTeamIsAlive()
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

    fightNextBoss() {
        AppState.storeAvailable = false
    }
    payPlayer() {
        console.log('player coins before:', AppState.playerCoins)
        AppState.playerCoins += AppState.activeMonster.coins
        console.log('player is paid:', AppState.playerCoins)
    }

    // TODO I need a check to see if all players all dead. something like if # of for each equippedHeroes .dead  == equippedHero.length
    // TODO if all the players characters die then the store opens up again 
    // NOTE needs to be referenced
    checkIfTeamIsAlive() {
        let deadHeroes = 0
        AppState.equippedCharacters.forEach(hero => {
            if (hero.dead) {
                deadHeroes++
            }
        })
        if (deadHeroes == AppState.equippedCharacters.length) {
            console.log('Your team died')
            AppState.teamDied = true
            AppState.storeAvailable = true
        }
    }

    // NOTE AppState.storeAvailable
    // NOTE I could have it so after you kill a boss AppState.storeAvailable = true. Then you have a button to go to the store & another button to "fight next boss". Once you press fight next boss then AppState.storeAvailable = false. 
    // NOTE can I v-if a router push? if not, maybe i could nest it in a div that is v-if?

    // TODO I need to make it so the player can only visit the store between bosses, if they can go to the store any time & just swap out their team then I cant pre-announce boss special moves or the player can just un-equip their team & equip a low level they don't care about to take the blow... alternatively I could just make it so when the boss activates a special you cant un-equip your team.. but the first option makes more sense & makes it feel more strategic, like when you kill a boss matters. 

    // NOTE once I implement it so the player can only access the store between bosses I will need something that recognizes if their full team dies. It could do let deadCharacters = 0; equippedCharacters.forEach{ if hero.dead, deadCharacters++} if equippedCharacters.length == deadCharacters, allowStoreAccess()
    // NOTE I did a test, playing it as if this was already implemented, only accessing the store between battles & I made it to boss 19 in the current balance. It was actually pretty difficult but I felt like I had strategic options, I think this is pretty good!

}

export const gameFunctionalityService = new GameFunctionalityService()