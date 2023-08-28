import { State } from "../State.js";

export class ResurrectingState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    enter(world) {
        this.phoenix.y = world.height - this.phoenix.height - 1;
        this.phoenix.setRebirthAnimation(world);
    }

    update(delta, world) {
        if (this.phoenix.animation.isCompleted) {
            this.phoenix.setRebornState(world);
        }
    }
}