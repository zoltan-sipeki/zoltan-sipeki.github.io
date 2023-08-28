import { WorldState } from "./WorldState.js";

export class RebirthState extends WorldState {
    constructor(world) {
        super(world);
    }

    enter() {
        this.world.restart();
    }

    update(delta) {
        this.world.phoenix.update(delta, this.world);
    }

}