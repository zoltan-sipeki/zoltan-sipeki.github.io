import { Pipe } from "./Pipe.js";
import { Phoenix } from "./Phoenix.js";
import { Background } from "./Background.js";

const WIDTH = 800;
export const HEIGHT = WIDTH * 9 / 16;
const MAX_DELTA = 100 / 6;

let lastTime = -1;

let graphics = null;

let phoenix = null;
let pipes = [];
let background = null;

let gameOver = false;
let score = 0;
let replays = 0;
let paused = true;
let accumTime = 0;

export function setup() {
    setupCanvas();
    restart();
}

export function run() {
    requestAnimationFrame(update);
}

function update(time) {
    clearCanvas();
    let delta = lastTime === -1 ? 0 : time - lastTime;

    if (paused) {
        background.draw(graphics);
        drawPipes(graphics);
        phoenix.draw(graphics);
        drawScore();
        drawPause();
    }
    else {
        accumTime += delta;
        while (accumTime >= MAX_DELTA) {
            phoenix.update(MAX_DELTA);
            
            if (isControlEnabled()) {
                background.update(MAX_DELTA);
                updatePipes(MAX_DELTA);
                updateScore();
                checkCollisions();
            }

            accumTime -= MAX_DELTA;
        }
        
        if (!gameOver && phoenix.isDead) {
            gameOver = true;
            ++replays;
        }


        background.draw(graphics);
        drawPipes();
        phoenix.draw(graphics);
        drawScore();
    }

    lastTime = time;

    requestAnimationFrame(update);
}

export function getLastPipeXPosition() {
    let x = -1;
    for (let i = 0; i < pipes.length; ++i) {
        x = Math.max(x, pipes[i].x);
    }

    return x;
}


function setupCanvas() {
    const canvas = document.querySelector("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    graphics = canvas.getContext("2d");
    graphics.font = "bold 40px sans-serif";

    document.addEventListener("keydown", jump);
}

function jump(e) {
    if (e.key === " ") {
        if (paused) {
            paused = false;
        }
        else if (gameOver) {
            restart();
        }
        else {
            phoenix.jump();
        }
    }
}

function clearCanvas() {
    graphics.clearRect(0, 0, WIDTH, HEIGHT);
}

function restart() {
    score = 0;
    gameOver = false;
    pipes = Pipe.createPipes(WIDTH);
    phoenix = new Phoenix(WIDTH / 8, HEIGHT / 2, HEIGHT);
    if (replays > 0) {
        phoenix.setBeingRebornState();
    }
    else {
        phoenix.setFlyingState();
    }
    background = new Background(WIDTH, HEIGHT);
}

function checkCollisions() {
    for (let i = 0; i < pipes.length; ++i) {
        if (phoenix.collidesWith(pipes[i])){
            phoenix.setFallingState();
            break;
        }
    }
}

function isControlEnabled() {
    return phoenix.isFlying;
}

function updateScore() {
    for (let i = 0; i < pipes.length; ++i) {
        if (!pipes[i].behindPhoenix && pipes[i].right < phoenix.x) {
            pipes[i].behindPhoenix = true;
            ++score;
        }
    }
}

function updatePipes(delta) {
    for (let i = 0; i < pipes.length; ++i) {
        pipes[i].update(delta);
    }
}

function drawPipes() {
    for (let i = 0; i < pipes.length; ++i) {
        pipes[i].draw(graphics);
    }
}

function drawScore() {
    drawText(score, "start", WIDTH - 70, 50);
}

function drawPause() {
    drawText("HIT SPACE TO START", "center", WIDTH / 2, HEIGHT / 2);
}

function drawText(text, alignment, x, y) {
    graphics.textAlign = alignment;
    graphics.fillStyle = "black";
    graphics.fillText(text, x, y);
    graphics.fillStyle = "white";
    graphics.fillText(text, x - 2,  y - 2);
}