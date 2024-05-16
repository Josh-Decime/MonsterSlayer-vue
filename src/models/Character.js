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
    }
}