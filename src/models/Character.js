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
        this.unlocked = data.unlocked
    }
}