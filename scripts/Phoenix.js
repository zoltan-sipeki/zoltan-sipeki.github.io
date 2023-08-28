import { drawSprite, isPixelTransparent } from "./PhoenixSprite.js";
import { FallenState } from "./states/phoenix/FallenState.js";
import { FallingState } from "./states/phoenix/FallingState.js";
import { FlyingState } from "./states/phoenix/FlyingState.js";
import { JumpingState } from "./states/phoenix/JumpingState.js";
import { RebornState } from "./states/phoenix/RebornState.js";
import { ResurrectingState } from "./states/phoenix/ResurrectingState.js";
import { DeathAnimation } from "./animations/DeathAnimation.js";
import { FlyingAnimation } from "./animations/FlyingAnimation.js";
import { RebirthAnimation } from "./animations/RebirthAnimation.js";

export class Phoenix {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.prevY = y;
        this.yVel = 0;
        this.yAcc = 0;
        this.width = 50;
        this.height = 50;
        this.state = null;
        this.spriteCoords = [];
        this.animation = null;

        this.flyingState = new FlyingState(this);
        this.jumpingState = new JumpingState(this);
        this.fallingState = new FallingState(this);
        this.fallenState = new FallenState(this);
        this.resurrectingState = new ResurrectingState(this);
        this.rebornState = new RebornState(this);
    }

    get bottom() {
        return this.y + this.height;
    }

    setFlyingState(world, shouldEnter = true) {
        this.state = this.flyingState;
        if (shouldEnter) {
            this.state.enter(world);
        }
        return this.state;
    }

    setJumpingState(world) {
        this.state = this.jumpingState;
        this.state.enter(world);
        return this.state;
    }

    setFallingState(world) {
        this.state = this.fallingState;
        this.state.enter(world);
        return this.state;
    }

    setFallenState(world) {
        this.state = this.fallenState;
        this.state.enter(world);
        return this.state;
    }

    setRebornState(world) {
        this.state = this.rebornState;
        this.state.enter(world);
        return this.state;
    }

    setResurrectingState(world) {
        this.state = this.resurrectingState;
        this.state.enter(world);
        return this.state;
    }

    setDeathAnimation() {
        this.animation = new DeathAnimation(this);
    }

    setFlyingAnimation() {
        this.animation = new FlyingAnimation(this);
    }
    
    setRebirthAnimation() {
        this.animation = new RebirthAnimation(this);
    }

    disableAnimation() {
        this.animation = null;
    }

    update(delta, world) {
        this.state.update(delta, world);
        if (this.animation != null) {
            this.animation.update(delta);
        }
    }

    collision(pipes) {
        for (let i = 0; i < pipes.length; ++i) {
            if (this.collidesWith(pipes[i])) {
                return true;
            }
        }
        return false;
    }

    applyForce(force) {
        this.yAcc += force;
    }

    updatePos(delta) {
        this.yVel += this.yAcc * delta;
        this.y += this.yVel * delta;
        this.yAcc = 0;
    }

    handleInput(key, world) {
        this.state.handleInput(key, world);
    }

    collidesWith(pipe) {
        const boxes = pipe.getBoundingBoxes();
        for (let i = 0; i < boxes.length; ++i) {
            const top = this.y;
            const left = this.x;
            const right = this.x + this.width;
            const bottom = this.y + this.height;

            if (left <= boxes[i].right && right >= boxes[i].left && top <= boxes[i].bottom && bottom >= boxes[i].top) {
                if (this.pixelCollision(boxes[i])) {
                    return true;
                }
            }
        }

        return false;
    }

    pixelCollision(box) {
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const px = this.x + x;
                const py = this.y + y;
                if (!isPixelTransparent(x, y, this.width, this.height, this.spriteCoords) && py > box.top && py < box.bottom && px > box.left && px < box.right) {
                    return true;
                }
            }
        }

        return false;
    }


    draw(graphics, world) {
        const x = this.spriteCoords[0];
        const y = this.spriteCoords[1];
        drawSprite(graphics, x, y, this.x, this.y, this.width, this.height);
    }
}
