import { Animation } from "./Animation.js";
import { drawSprite } from "./PhoenixSprite.js";

export class DeathAnimation extends Animation {
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
    }

    update(delta) {
        if (this.phoenix.isFalling) {
            this.currentIndex = 0;
        }
        else if (this.phoenix.hitTheGround) {
            this.accumTime += delta;
            this.currentIndex = Math.floor(this.accumTime / this.interval) + 1;
            if (this.currentIndex >= this.indices.length) {
                this.currentIndex = this.indices.length - 1;
                this.phoenix.setDeadState();
            }
        }
    }

    draw(graphics) {
        const x = this.indices[this.currentIndex][0];
        const y = this.indices[this.currentIndex][1];
        drawSprite(graphics, x, y, this.phoenix.x, this.phoenix.y, this.phoenix.width, this.phoenix.height);
    }
}