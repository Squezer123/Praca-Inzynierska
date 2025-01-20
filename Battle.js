import {events, resources} from "./Exporter.js";

export class Battle {
    constructor(Enemy, Hero) {
        this.enemy = Enemy;
        this.hero = Hero;
        this.attackQueue = []; // Kolejka ataków
        this.attacker = this.hero;
        this.firstAttacker = Math.random() < 0.5 ? this.enemy : this.hero;
    }

    BattleSimulation() {
        let heroHp = this.hero.hp;
        let enemyHp = this.enemy.hp;
        if (this.firstAttacker !== null) {
            this.attacker = this.firstAttacker;
            this.firstAttacker = null;
        }

        while (heroHp > 0 && enemyHp > 0) { // Continue until one is defeated
            const damage = this.Attack(this.attacker);
            let defendant;

            if (this.attacker === this.hero) {
                enemyHp -= damage;
                defendant = this.enemy;
                console.log(`${this.hero.name} attacks ${this.enemy.name} for ${damage} damage! Remaining HP: ${enemyHp}`);
                this.attacker = this.enemy;
            } else {
                heroHp -= damage;
                defendant = this.hero;
                console.log(`${this.enemy.name} attacks ${this.hero.name} for ${damage} damage! Remaining HP: ${heroHp}`);
                this.attacker = this.hero;
            }

            this.attackQueue.push({
                Attacker: this.attacker.name,
                Defendant: defendant.name,
                Damage: damage
            });
        }
        this.BattleVisualisation();

        if (heroHp <= 0) {
            return this.enemy;
        } else {
            return this.hero;
        }
    }

    BattleVisualisation() {
        let body = document.getElementsByTagName("body")[0];

        let battleBackground = resources.images.caveBackGround;

        let battleContainer = document.createElement("div");
        battleContainer.classList.add("battleContainer");
        battleContainer.style.backgroundImage = `url(${battleBackground})`;
        body.appendChild(battleContainer);

        // Karty dla bohatera i przeciwnika
        const heroCard = this.createCard(this.hero);
        const enemyCard = this.createCard(this.enemy);

        battleContainer.appendChild(heroCard);
        battleContainer.appendChild(enemyCard);

        this.processAttackQueue(battleContainer, heroCard, enemyCard);
    }

    processAttackQueue(container, heroCard, enemyCard) {
        const interval = setInterval(() => {
            if (this.attackQueue.length === 0) {
                clearInterval(interval);
                return;
            }

            this.VisualiseAttack(heroCard, enemyCard);
        }, 1000);
    }

    VisualiseAttack(heroCard, enemyCard) {
        let { Attacker, Defendant, Damage } = this.attackQueue[0];
        this.attackQueue.shift();


        if (this.hero.name === Defendant) {
            this.hero.hp -= Damage;
            this.updateHealthBar(heroCard, this.hero);
        } else {
            this.enemy.hp -= Damage;
            this.updateHealthBar(enemyCard, this.enemy);
        }

        if (this.hero.hp <= 0 || this.enemy.hp <= 0) {
            this.declareWinner();
        }
    }

    updateHealthBar(card, character) {
        const healthFill = card.querySelector(".health-fill");
        const healthText = card.querySelector(".card-stats p");

        healthFill.style.width = `${(character.hp / character.maxHp) * 100}%`;
        healthText.textContent = `HP: ${character.hp} / ${character.maxHp}`;
    }

    declareWinner() {
        const winner = this.hero.hp > 0 ? this.hero.name : this.enemy.name;
        const result = document.createElement("div");
        result.classList.add("battle-result");
        result.textContent = `Winner: ${winner}!`;
        document.getElementsByClassName('battleContainer')[0].remove();
        events.emit('BATTLE_END');

    }

    createCard(character) {
        const card = document.createElement("div");
        card.classList.add("card");

        const header = document.createElement("div");
        header.classList.add("card-header");
        header.textContent = character.name;

        const image = document.createElement("div");
        image.classList.add("card-image");
        const img = document.createElement("img");
        img.src = character.image || "/assets/heroAvatar.png";
        img.alt = `${character.name} Image`;
        image.appendChild(img);

        const stats = document.createElement("div");
        stats.classList.add("card-stats");

        const healthBar = document.createElement("div");
        healthBar.classList.add("health-bar");

        const healthFill = document.createElement("div");
        healthFill.classList.add("health-fill");
        healthFill.style.width = `${(character.hp / character.maxHp) * 100}%`;
        healthBar.appendChild(healthFill);

        const healthText = document.createElement("p");
        healthText.textContent = `HP: ${character.hp} / ${character.maxHp}`;

        stats.appendChild(healthBar);
        stats.appendChild(healthText);

        card.appendChild(header);
        card.appendChild(image);
        card.appendChild(stats);

        return card;
    }

    Attack(attacker) {
        let damage;

        switch (attacker.class) {
            case "Warrior":
                damage = Math.floor(Math.random() * 10) + 10;
                break;
            case "Mage":
                damage = Math.floor(Math.random() * 15) + 5;
                break;
            case "Rogue":
                damage = Math.floor(Math.random() * 8) + 12;
                break;
            default:
                damage = Math.floor(Math.random() * 5) + 5;
                break;
        }

        return damage;
    }
}
