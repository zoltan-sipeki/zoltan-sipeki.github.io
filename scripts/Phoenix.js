import { isPixelTransparent } from "./PhoenixSprite.js";
import { FlyAnimation } from "./FlyAnimation.js";
import { DeathAnimation } from "./DeathAnimation.js";
import { RebirthAnimation } from "./RebirthAnimation.js";

const GRAVITY = 0.00125;
const JUMP_FORCE = -0.03;

export class Phoenix {
    constructor(x, y, screenHeight) {
        this.x = x;
        this.y = y;
        this.prevY = y;
        this.ground = screenHeight;
        this.yVel = 0;
        this.yAcc = 0;
        this.width = 50;
        this.height = 50;
        this.canJump = false;
        this.isJumping = false;
        this.isDead = false;
        this.isFalling = false;
        this.hitTheGround = false;
        this.isBeingReborn = false;
        this.isReborn = false;
        this.isFalling = false;
        this.animation = null;
    }

    update(delta) {
        if (this.y + this.height >= this.ground) {
            this.setHitTheGroundState()
        }

        if (this.hitTheGround) {
            this.y = this.ground - this.height;
        }
        else if (this.isFlying) {
            this.canJump = this.yVel > 0
            this.updatePhysics(delta);
            this.isJumping = false;
        }
        else if (this.isFalling) {
            this.updatePhysics(delta);
        }
        else if (this.isReborn) {
            this.y -= 0.3 * delta;
            if (this.y <= this.prevY) {
                this.y = this.prevY;
                this.yVel = 0;
                this.setFlyingState();
            }
        }

        this.animation.update(delta);
    }

    updatePhysics(delta) {
        if (this.isJumping) {
            this.yAcc += JUMP_FORCE;
        }
        this.yAcc += GRAVITY;
        this.yVel += this.yAcc * delta;
        this.y += this.yVel * delta;
        this.yAcc = 0;
    }

    jump() {
        if (this.isFlying && this.canJump) {
            this.isJumping = true;
        }
    }
    
    setDeadState() {
        if (!this.isDead) {
            this.hitTheGround = false;
            this.isDead = true;
        }
    }

    setHitTheGroundState() {
        if (!this.hitTheGround) {
            this.isFalling = false;
            if (this.isFlying) {
                this.animation = new DeathAnimation(this);
                this.isFlying = false;
            }
            this.hitTheGround = true;
        }
    }

    setFlyingState() {
        if (!this.isFlying) {
            this.isReborn = false;
            this.isFlying = true;
            this.animation = new FlyAnimation(this);
        }
    }

    setBeingRebornState() {
        if (!this.isBeingReborn) {
            this.isBeingReborn = true;
            this.y = this.ground - this.height - 1;
            this.animation = new RebirthAnimation(this);
        }
    }

    setRebornState() {
        if (!this.isReborn) {
            this.isBeingReborn = false;
            this.isReborn = true;
        }
    }

    setFallingState() {
        if (!this.isFalling) {
            this.isFlying = false;
            this.isFalling = true;
            this.animation = new DeathAnimation(this);
        }
    }

    collidesWith(pipe) {
        if (!this.isFlying) {
            return false;
        }

        const boxes = pipe.getBoundingBoxes();
        for (let i = 0; i < boxes.length; ++i) {
            const top = this.y;
            const left = this.x;
            const right = this.x + this.width;
            const bottom = this.y + this.height;

            if ((right > boxes[i].left && right < boxes[i].right || left > boxes[i].left && left < boxes[i].right) && (top > boxes[i].top && top < boxes[i].bottom || bottom > boxes[i].top && bottom < boxes[i].bottom)) {
                if (this.pixelCollision(boxes[i])) {
                    return true;
                }
            }
        }

        return false;
    }

    pixelCollision(box) {
        const spriteCoords = this.animation.getCurrentSpriteCoords();
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const px = this.x + x;
                const py = this.y + y;
                if (!isPixelTransparent(x, y, this.width, this.height, spriteCoords) && py > box.top && py < box.bottom && px > box.left && px < box.right) {
                    return true;
                }
            }
        }

        return false;
    }


    draw(graphics) {
        this.animation.draw(graphics);
    }
}
