import { config } from "./config.js";
import { G } from "./g.js";

let deliveries = 0;

export function countDelivery() {
    deliveries += 1;
}
export function drawHud() {
    noStroke();
    fill(config.hud.textColor);

    if (deliveries >= 10) {
        textSize(72);
        text(`Complete!`, 0.5 * G.CANVAS_SIZE, 0.4 * G.CANVAS_SIZE);
    } else if (deliveries > 0) {
        textSize(16);
        text(`deliveries: ${deliveries}/10`, 0.1 * G.CANVAS_SIZE, 0.02 * G.CANVAS_SIZE);
    }
}