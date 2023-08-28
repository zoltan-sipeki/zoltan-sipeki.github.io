import { GameOverState } from "./states/game/GameOverState.js";
import { PausedState } from "./states/game/PausedState.js";
import { RunningState } from "./states/game/RunningState.js";
import { Pipe } from "./Pipe.js";
import { Phoenix } from "./Phoenix.js";
import { Background } from "./Background.js";
import { Score } from "./Score.js";
import { RebirthState } from "./states/game/RebirthState.js";
import { CollisionState } from "./states/game/CollisionState.js";

export class World {
    constructor(width, height, gravity) {
        this.width = width;
        this.height = height;
        this.gravity = gravity;
        this.score = null;
        this.phoenix = null;
        this.pipes = [];
        this.background = null;
        this.replays = 0;
        this.state = null;

        this.collisionState = new CollisionState(this);
        this.rebirthState = new RebirthState(this);
        this.gameOverState = new GameOverState(this);
        this.pausedState = new PausedState(this);
        this.runningState = new RunningState(this);

        this.setPausedState();
    }

    handleInput(key) {
        this.state.handleInput(key);
    }

    update(delta) {
        this.state.update(delta);
    }

    draw(graphics) {
        this.state.draw(graphics);
    }

    setCollisionState() {
        this.state = this.collisionState;
        this.state.enter();
    }

    setRebirthState() {
        this.state = this.rebirthState;
        this.state.enter();
    }
    
    setGameOverState() {
        this.state = this.gameOverState;
        this.state.enter();
    }
    
    setPausedState() {
        this.state = this.pausedState;
        this.state.enter();
    }

    setRunningState(shouldEnter = true) {
        this.state = this.runningState;
        if (shouldEnter) {
            this.state.enter();
        }
    }

    restart() {
        this.score = new Score();
        this.pipes = Pipe.createPipes(this);
        this.phoenix = new Phoenix(this.width / 8, this.height / 2);
        if (this.replays > 0) {
            this.phoenix.setResurrectingState(this);
        }
        else {
            this.phoenix.setFlyingState(this);
        }
        this.background = new Background(this.width, this.height);
    }
}