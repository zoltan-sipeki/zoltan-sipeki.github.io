import { Animation } from "./Animation.js";

export class FlyingAnimation extends Animation{
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]];
    }

    update(delta) {
        this.accumTime += delta;
        this.currentIndex = Math.floor(this.accumTime / this.interval) % this.indices.length;
        this.phoenix.spriteCoords = this.indices[this.currentIndex];
    }
}