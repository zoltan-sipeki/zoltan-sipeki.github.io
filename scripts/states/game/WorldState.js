import { State } from "../State.js";

export class WorldState extends State {
    constructor(world) {
        super();
        this.world = world;
    }

    draw(graphics) {
        const { background, pipes, phoenix, score } = this.world;
        background.draw(graphics, this.world);
        for (let i = 0; i < pipes.length; ++i) {
            pipes[i].draw(graphics, this.world);
        }
        phoenix.draw(graphics, this.world);
        score.draw(graphics, this.world);
    }
}