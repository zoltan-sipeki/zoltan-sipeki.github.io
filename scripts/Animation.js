export class Animation {
    constructor(phoenix) {
        this.phoenix = phoenix;
        this.indices = [];
        this.interval = 100;
        this.currentIndex = 0;
        this.accumTime = 0;
    }

    update(delta) {

    }

    draw(graphics) {

    }

    getCurrentSpriteCoords() {
        return this.indices[this.currentIndex];
    }
}