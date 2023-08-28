import { State } from "../State.js";

export class FallenState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    enter(world) {
        world.setCollisionState();
        this.phoenix.setDeathAnimation();
    }

    update(delta, world) {
        this.phoenix.y = world.height - this.phoenix.height;
        if (this.phoenix.animation.isCompleted) {
            world.setGameOverState();
        }
    }
}