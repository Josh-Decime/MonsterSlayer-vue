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

        // NOTE I was thinking of just having one countdown for simplicity but these will have to be unique for every condition or it will be impossible to have multiple count down effects
        this.effectTurnCount = data.effectTurnCount || 0

        this.healer = data.healer || false
        this.healAmount = data.healAmount || null
        this.healCost = data.healCost || null

        this.healerOverTime = data.healerOverTime || false
        this.healOverTimeAmount = data.healOverTimeAmount || null
        this.healOverTimeCost = data.healOverTimeCost || null
        this.healOverTimeDuration = data.healOverTimeDuration || null
        this.healOverTimeCounter = data.healOverTimeCounter || 0
        this.healOverTimeBy = this.healOverTimeBy || null
        this.healOverTimeAmountHolder = this.healOverTimeAmountHolder || null

        this.striker = data.striker || false
        this.strikeAmount = data.strikeAmount || null
        this.strikeCost = data.strikeCost || null

        this.shield = data.shield || false
        this.shieldCost = data.shieldCost || null
        this.shieldActive = data.shieldActive || false

        this.overcharge = data.overcharge || false
        this.overchargeAmount = data.overchargeAmount || null

        this.kamikaze = data.kamikaze || false
        this.kamikazeDamage = data.kamikazeDamage || null
        this.kamikazePowerCost = data.kamikazePowerCost || null
        this.kamikazeHealthCost = data.kamikazeHealthCost || null

        // TODO berserk- increase damage & damage taken over time
        // TODO morale- adds temporary health which can boost over max health
        // TODO taunt- only that character gets attacked for X number of rounds
        // TODO protector- reduce damage to all characters for X rounds




        // TODO player powers:
        // TODO sweep under the rug- skip to next monster
    }
}