import { State } from "../State.js";

const ASCENSION_SPEED = 0.3;

export class RebornState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    update(delta, world) {
        this.phoenix.y -= ASCENSION_SPEED * delta;
        if (this.phoenix.y <= this.phoenix.prevY) {
            this.phoenix.y = this.phoenix.prevY;
            this.phoenix.yVel = 0;
            this.phoenix.setFlyingState(world);
            world.setRunningState(false);
        }
    }
}