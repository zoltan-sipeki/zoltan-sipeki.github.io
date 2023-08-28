export function drawText(graphics, text, alignment, x, y) {
    graphics.textAlign = alignment;
    graphics.fillStyle = "black";
    graphics.fillText(text, x, y);
    graphics.fillStyle = "white";
    graphics.fillText(text, x - 2,  y - 2);
}