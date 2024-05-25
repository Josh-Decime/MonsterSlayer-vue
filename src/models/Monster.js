import { generateId } from "../utils/GenerateId.js";




export class Monster {
    constructor(data) {
        this.id = data.id || generateId()
        this.name = data.name
        this.img = data.img
        this.damage = data.damage
        this.critChance = data.critChance || 0.25
        this.critMultiplier = data.critMultiplier || 2
        this.health = data.health
        this.maxHealth = data.maxHealth
        this.level = data.level
        this.coins = data.coins
        // this.specialActivated = data.specialActivated || false

        // NOTE special moves for bosses, chosen the round before & gives warning that it will activate after the round ends
        this.striker = data.striker || false
        this.strikerDamage = data.strikerDamage || null
        this.strikerActivateChance = data.strikerActivateChance || null
        this.strikerSpecialActivated = data.strikerSpecialActivated || false
        this.strikerAttacked = data.strikerAttacked || false
    }
}