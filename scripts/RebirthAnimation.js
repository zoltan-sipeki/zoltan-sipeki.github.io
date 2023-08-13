import { Animation } from "./Animation.js";
import { drawSprite } from "./PhoenixSprite.js";

export class RebirthAnimation extends Animation {
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [0, 1]];
    }

    update(delta) {
        this.accumTime += delta;
        this.currentIndex = Math.floor(this.accumTime / this.interval);
        if (this.currentIndex >= this.indices.length) {
            this.currentIndex = this.indices.length - 1;
            this.phoenix.setRebornState();
        }
    }

    draw(graphics) {
        const x = this.indices[this.currentIndex][0];
        const y = this.indices[this.currentIndex][1];
        drawSprite(graphics, x, y, this.phoenix.x, this.phoenix.y, this.phoenix.width, this.phoenix.height);
    }
}