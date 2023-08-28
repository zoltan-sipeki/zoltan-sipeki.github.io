import { State } from "../State.js";

export class FlyingState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    enter(world) {
        this.phoenix.spriteCoords = [0, 0];
        this.phoenix.setFlyingAnimation();
    }

    handleInput(key, world) {
        if (key === " ") {
            return this.phoenix.setJumpingState(world);
        }
    }

    update(delta, world) {
        this.phoenix.applyForce(world.gravity);
        this.phoenix.updatePos(delta);
        
        if (this.phoenix.bottom >= world.height) {
            this.phoenix.setFallenState(world);
        }
        
        if (this.phoenix.collision(world.pipes)) {
            world.setCollisionState();
            this.phoenix.setFallingState(world);
        }
    }
}