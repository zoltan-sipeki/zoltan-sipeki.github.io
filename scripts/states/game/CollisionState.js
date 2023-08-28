import { WorldState } from "./WorldState.js";

export class CollisionState extends WorldState {
    constructor(world) {
        super(world);
    }

    update(delta) {
        this.world.phoenix.update(delta, this.world);
    }
}