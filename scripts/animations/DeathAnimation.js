import { Animation } from "./Animation.js";

export class DeathAnimation extends Animation {
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
    }

    update(delta) {
        if (this.isCompleted) {
            return;
        }

        this.accumTime += delta;
        this.currentIndex = Math.floor(this.accumTime / this.interval) + 1;
        if (this.currentIndex >= this.indices.length) {
            this.currentIndex = this.indices.length - 1;
            this.isCompleted = true;
        }

        this.phoenix.spriteCoords = this.indices[this.currentIndex];
    }
}