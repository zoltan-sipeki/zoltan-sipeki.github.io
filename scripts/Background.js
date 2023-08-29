const SPEED = 0.02;

export class Background {
    constructor(screenWidth, screenHeight) {
        this.x = 0;
        this.image = document.querySelector("#background");
        this.width = screenWidth;
        this.height = screenHeight;
    }

    update(delta, world) {
        this.x -= delta * SPEED;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    draw(graphics, world) {
        graphics.drawImage(this.image, this.x, 0, this.width, this.height);
        graphics.drawImage(this.image, this.x + this.width - 1, 0, this.width, this.height);
    }
}