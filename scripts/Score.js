import { drawText } from "./utils.js";

export class Score {
    constructor() {
        this.score = 0;
    }

    update(delta, world) {
        const { pipes, phoenix } = world;

        for (let i = 0; i < pipes.length; ++i) {
            if (!pipes[i].behindPhoenix && pipes[i].right < phoenix.x) {
                pipes[i].behindPhoenix = true;
                ++this.score;
            }
        }
    }

    draw(graphics, world) {
        drawText(graphics, this.score, "start", world.width - 70, 50);
    }
}