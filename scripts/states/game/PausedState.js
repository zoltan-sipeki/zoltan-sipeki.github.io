import { drawText } from "../../utils.js";
import { WorldState } from "./WorldState.js";

export class PausedState extends WorldState{
    constructor(world) {
        super(world);
    }

    enter() {
        this.world.restart();
    }

    handleInput(key) {
        if (key === " ") {
            this.world.setRunningState(false);
        }
    }

    draw(graphics) {
        super.draw(graphics);
        drawText(graphics, "HIT SPACE TO START", "center", this.world.width / 2, this.world.height / 2);
    }

}