import { config } from "./config.js";
import { G } from "./g.js";

let deliveries = 0;

export function countDelivery() {
    deliveries += 1;
}
export function drawHud() {
    noStroke();
    fill(config.hud.textColor);
    textSize(16);

    if (deliveries > 0) {
        text(`deliveries: ${deliveries}/10`, 0.1 * G.CANVAS_SIZE, 0.02 * G.CANVAS_SIZE);
    }
}