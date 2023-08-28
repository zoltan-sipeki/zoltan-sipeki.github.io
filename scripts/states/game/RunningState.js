import { WorldState } from "./WorldState.js";

export class RunningState extends WorldState {
    constructor(world) {
        super(world);
    }

    enter() {
        this.world.restart();
    }

    handleInput(key) {
        this.world.phoenix.handleInput(key, this.world);
    }

    update(delta) {
        const { background, phoenix, pipes, score } = this.world;
        
        background.update(delta, this.world);
        phoenix.update(delta, this.world);
        for (let i = 0; i < pipes.length; ++i) {
            pipes[i].update(delta, this.world);
        }
        score.update(delta, this.world);
    }
}