const SPRITE_SIZE = 32;
const spriteSheet = document.querySelector("#phoenix");

const canvas = document.createElement("canvas");
canvas.width = spriteSheet.width;
canvas.height = spriteSheet.height;

const graphics = canvas.getContext("2d");
graphics.drawImage(spriteSheet, canvas.width, canvas.height);

const pixels = graphics.getImageData(0, 0, canvas.width, canvas.height);

export function drawSprite(graphics, sx, sy, dx, dy, phoenixWidth, phoenixHeight) {
    graphics.drawImage(spriteSheet, sx * SPRITE_SIZE, sy *SPRITE_SIZE, SPRITE_SIZE, SPRITE_SIZE, dx, dy, phoenixWidth, phoenixHeight);
}

export function isPixelTransparent(x, y, phoenixWidth, phoenixHeight, spriteCoords) {
    const dx = Math.floor(x * SPRITE_SIZE / phoenixWidth) + spriteCoords[0] * SPRITE_SIZE;
    const dy = Math.floor(y * SPRITE_SIZE / phoenixHeight) + spriteCoords[1] * SPRITE_SIZE;

    return pixels[4 * (dx * canvas.height + dy) + 3] === 0;
}
