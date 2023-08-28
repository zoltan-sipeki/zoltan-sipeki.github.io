import { Animation } from "./Animation.js";

export class RebirthAnimation extends Animation {
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [0, 1]];
    }

    update(delta) {
        if (this.isCompleted) {
            return;
        }

        this.accumTime += delta;
        this.currentIndex = Math.floor(this.accumTime / this.interval);
        if (this.currentIndex >= this.indices.length) {
            this.currentIndex = this.indices.length - 1;
            this.isCompleted = true;
        }

        this.phoenix.spriteCoords = this.indices[this.currentIndex];
    }
}