import { State } from "../State.js";

export class FallingState extends State {
    constructor(phoenix) {
        super();
        this.phoenix = phoenix;
    }

    enter(world) {
        this.phoenix.disableAnimation();
        this.phoenix.spriteCoords = [0, 1];
    }

    update(delta, world) {
        this.phoenix.applyForce(world.gravity);
        this.phoenix.updatePos(delta);
        
        if (this.phoenix.bottom >= world.height) {
            return this.phoenix.setFallenState(world);
        }
    }
}