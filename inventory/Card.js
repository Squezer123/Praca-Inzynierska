import {events} from "../Exporter.js";

export class Card {
    constructor({name, type, subType, imageUrl}) {
        this.name = name;
        this.type = type;
        this.subType = subType;
        this.imageUrl = imageUrl;
        this.rarity = this.generateRarity();
        this.stats = this.generateStats();
}

    generateRarity() {
        const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
        return rarities[this.randomValue(0, rarities.length - 1)];
    }

    // Generowanie statystyk na podstawie typu i podtypu
    generateStats() {
        const stats = {};

        if (this.type === 'Bron') {
            stats.minDamage = this.randomValue(10, 50); // Obrażenia dla broni
            stats.maxDamage = this.randomValue(stats.minDamage+20, stats.minDamage+50);

        } else if (this.type === 'Zbroja') {
            stats.defense = this.randomValue(20, 100);
        }

        stats.int = this.randomValue(0,20);
        stats.str = this.randomValue(0,20);
        stats.ag = this.randomValue(0,20);

        return stats;
    }

    randomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

