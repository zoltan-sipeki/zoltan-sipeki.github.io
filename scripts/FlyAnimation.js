import { Animation } from "./Animation.js";
import { drawSprite } from "./PhoenixSprite.js";

export class FlyAnimation extends Animation{
    constructor(phoenix) {
        super(phoenix);
        this.indices = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]];
    }

    update(delta) {
        this.accumTime += delta;
        this.currentIndex = Math.floor(this.accumTime / this.interval) % this.indices.length;    
    }

    draw(graphics) {
        const x = this.indices[this.currentIndex][0];
        const y = this.indices[this.currentIndex][1];
        drawSprite(graphics, x, y, this.phoenix.x, this.phoenix.y, this.phoenix.width, this.phoenix.height);        
    }

}