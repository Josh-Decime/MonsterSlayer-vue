import { generateId } from "../utils/GenerateId.js";




export class Character {
    constructor(data) {
        this.id = data.id || generateId()
        this.name = data.name
        this.img = data.img
        this.damage = data.damage
        this.health = data.health
        this.maxHealth = data.maxHealth
        this.level = data.level
        this.purchasePrice = data.purchasePrice
        this.unlocked = data.unlocked
        this.equip = data.equip
        this.upgradeCost = data.upgradeCost
        this.hasAttacked = data.hasAttacked
        this.dead = data.dead || false
        this.reviveCost = data.reviveCost

        // SECTION special moves
        this.healer = data.healer || false
        this.healAmount = data.healAmount || null
        this.healCost = data.healCost || null

        // TODO striker- small damage boost for one attack
        this.striker = data.striker || false
        this.strikeAmount = data.strikeAmount || null
        this.strikeCost = data.strikeCost || null

        // TODO kamakazi- does very high damage at the cost of health, one attack
        // TODO berserk- increase damage & damage taken over time
        // TODO morale- small health increase over time
        // TODO shield- block enemy damage for all characters in one round
        // TODO taunt- only that character gets attacked for X number of rounds
        // TODO protector- reduce damage to all characters for X rounds



        // TODO player powers:
        // TODO sweep under the rug- skip to next monster
    }
}