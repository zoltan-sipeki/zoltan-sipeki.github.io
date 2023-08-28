import { State } from "../State.js";

const JUMP_FORCE = -0.03;

export class JumpingState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    enter(world) {
        this.phoenix.applyForce(JUMP_FORCE);
    }

    update(delta, world) {
        this.phoenix.applyForce(world.gravity);
        this.phoenix.updatePos(delta);
        if (this.phoenix.collision(world.pipes)) {
            world.setCollisionState();
            this.phoenix.setFallingState(world);
        }
        
        if (this.phoenix.yVel > 0) {
            this.phoenix.setFlyingState(world, false);
        }
    }
}