import { HEIGHT as SCREEN_HEIGHT, getLastPipeXPosition } from "./game.js";

const SPEED = 0.1;
const HORIZONTAL_GAP = 140;
const VERTICAL_GAP = 130;
const WIDTH = 70;
const HEIGHT = 300;
const PIPE_SPRITE = document.querySelector("#pipe");

export class Pipe {
    constructor(x) {
        this.topY = 0;
        this.reset(x);
    }

    get right() {
        return this.x + WIDTH;
    }

    reset(x) {
        this.x = x;
        this.behindPhoenix = false;
        this.topHeight = SCREEN_HEIGHT / 4 + Math.floor(Math.random() * (2 * SCREEN_HEIGHT / 4 - VERTICAL_GAP));
        this.topY = this.topHeight - HEIGHT;
        this.bottomY = this.topHeight + VERTICAL_GAP;
        this.bottomHeight = SCREEN_HEIGHT - this.topHeight - VERTICAL_GAP;
    }

    update(delta) {
        this.x -= delta * SPEED;
        if (this.x + WIDTH < 0) {
            const x = getLastPipeXPosition() + HORIZONTAL_GAP + WIDTH;
            this.reset(x);
        }
    }

    draw(graphics) {
        graphics.save();
        graphics.translate(this.x + WIDTH / 2, 0);
        graphics.rotate(Math.PI);
        graphics.translate(-WIDTH / 2, -this.topHeight);
        graphics.drawImage(PIPE_SPRITE, 0, 0, PIPE_SPRITE.width, PIPE_SPRITE.height, 0, 0, WIDTH, HEIGHT);
        graphics.restore();
        graphics.drawImage(PIPE_SPRITE, 0, 0, PIPE_SPRITE.width, PIPE_SPRITE.height, this.x, this.bottomY, WIDTH, HEIGHT);
    }

    getBoundingBoxes() {
        return [{
            top: this.topY,
            bottom: this.topHeight,
            left: this.x,
            right: this.x + WIDTH
        }, { 
            top: this.bottomY, 
            bottom: SCREEN_HEIGHT, 
            left: this.x, 
            right: this.x + WIDTH
        }];
    }

    static createPipes(screenWidth) {
        const pipes = [];
        let x = screenWidth / 2;
        const pipeCount = Math.ceil(screenWidth / (HORIZONTAL_GAP + WIDTH)) + 1;
        for (let i = 0; i < pipeCount; ++i) {
            const pipe = new Pipe(x);
            pipes.push(pipe);
            x +=  HORIZONTAL_GAP + WIDTH;
        }

        return pipes;
    }
}