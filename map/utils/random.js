export default class Random {
    constructor(seed) {
        this.seed = seed || Math.random(); // Używa ziarna lub generuje je losowo
        this.state = this.seed; // Stan wewnętrzny do deterministycznego generowania
    }

    // Generator pseudolosowy (LCG)
    _random() {
        const a = 1664525;
        const c = 1013904223;
        const m = 2 ** 32;

        this.state = (a * this.state + c) % m;
        return this.state / m;
    }

    int(min, max) {
        return Math.floor(this._random() * (max - min + 1)) + min;
    }

    float(min = 0, max = 1) {
        return this._random() * (max - min) + min;
    }

    vec(min, max) {
        // min i max to wektory [int, int]
        return [this.int(min[0], max[0]), this.int(min[1], max[1])];
    }

    choose(items, remove = false) {
        const idx = this.int(0, items.length - 1);
        if (remove) {
            return items.splice(idx, 1)[0];
        } else {
            return items[idx];
        }
    }

    maybe(probability) {
        return this.float() <= probability;
    }
}