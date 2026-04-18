import { config } from "./config.js";
import { G } from "./g.js";

export function doCameraTransform() {
    translate(
        -G.camera.x,
        -G.camera.y);
}

export function updateCamera() {
    G.camera.x = lerp(G.camera.x, G.ship.x - G.CANVAS_SIZE/2, config.cameraBlend);
    G.camera.y = lerp(G.camera.y, G.ship.y - G.CANVAS_SIZE/2, config.cameraBlend);
}