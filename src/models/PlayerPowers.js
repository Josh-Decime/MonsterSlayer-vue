

export class PlayerPower {
    constructor(data) {
        // Do I actually even need this? could I just put this information straight into the AppState & access it there? Its not like Im making variations, each is its own unique ability...
        // life has been so insanely busy the last month, I don't have the time to figure this out today since i have other more pressing matters
        // TODO do I need this model or can I just put this straight into the AppState
        // I just realized this is a bad naming convention because player power is the currency to use player powers...
        // TODO rename PlayerPowers

        // NOTE skip boss power
        this.skipBossUnlocked = data.skipBossUnlocked || false
        this.skipBossPowerCost = data.skipBossPowerCost || 100
    }
}