import { World } from "./World.js";

const WIDTH = 800;
export const HEIGHT = WIDTH * 9 / 16;
const MAX_DELTA = 100 / 6;
const GRAVITY = 0.00125;

export class Game {
    constructor() {
        this.lastTime = -1;
        this.graphics = null;
        this.accumTime = 0;
        this.world = new World(WIDTH, HEIGHT, GRAVITY);

        this.setupCanvas();
    }

    setupCanvas() {
        const canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        this.graphics = canvas.getContext("2d");
        this.graphics.font = "bold 40px sans-serif";
        
        document.body.prepend(canvas);
        document.addEventListener("keydown", this.handleInput.bind(this));
    }

    clearCanvas() {
        this.graphics.clearRect(0, 0, WIDTH, HEIGHT);
    }

    handleInput(e) {
        this.world.handleInput(e.key)
    }

    run() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(time) {
        const delta = this.lastTime === -1 ? 0 : time - this.lastTime;
        this.update(delta);
        this.lastTime = time;
        this.run();
    }

    update(delta) {
        this.clearCanvas();
        this.accumTime += delta;

        while (this.accumTime >= MAX_DELTA) {
            this.world.update(MAX_DELTA);
            this.accumTime -= MAX_DELTA;
        }

        this.world.draw(this.graphics);
    }
}

