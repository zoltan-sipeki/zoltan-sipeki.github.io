import { WorldState } from "./WorldState.js";

export class GameOverState extends WorldState {
    constructor(world) {
        super(world);
    }

    handleInput(key) {
        if (key === " ") {
            ++this.world.replays;
            this.world.setRebirthState();
        }
    }

    update(delta) {
        this.world.phoenix.update(delta, this.world);
    }

}