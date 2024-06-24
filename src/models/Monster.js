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

        this.healer = data.healer || false
        this.healAmount = data.healAmount || null
        this.healActivateChance = data.healActivateChance || null
        this.healSpecialActivated = data.healSpecialActivated || false
        this.healUsed = data.healUsed || false

        this.shield = data.shield || false
        this.shieldActivateChance = data.shieldActivateChance || null
        this.shieldSpecialActivated = data.shieldSpecialActivated || false
        this.shieldUsed = data.shieldUsed || false

        this.kamikaze = data.kamikaze || false
        this.kamikazeDamage = data.kamikazeDamage || null
        this.kamikazeHealthCost = data.kamikazeHealthCost || null
        this.kamikazeActivateChance = data.kamikazeActivateChance || null
        this.kamikazeSpecialActivated = data.kamikazeSpecialActivated || false
        this.kamikazeUsed = data.kamikazeUsed || false
        this.kamikazeDamageApplied = data.kamikazeDamageApplied || false

        this.sickness = data.sickness || false
        this.sicknessDamage = data.sicknessDamage || null
        this.sicknessDuration = data.sicknessDuration || null
        this.sicknessTurnCounter = data.sicknessTurnCounter || null
        this.sicknessActivationChance = data.sicknessActivationChance || null
        this.sicknessSpecialActivated = data.sicknessSpecialActivated || false
        this.sicknessUsed = data.sicknessUsed || false


    }
}