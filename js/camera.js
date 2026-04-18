import { config } from "./config.js";
import { G } from "./g.js";
import { world } from "./world.js";

export function doCameraTransform() {
    translate(
        -G.camera.x,
        -G.camera.y);
}

export function updateCamera() {
    G.camera.x = lerp(G.camera.x, G.ship.x - G.CANVAS_SIZE/2, config.cameraBlend);
    G.camera.y = lerp(G.camera.y, G.ship.y - G.CANVAS_SIZE/2, config.cameraBlend);
    G.camera.x = constrain(G.camera.x, 0, world.width - G.CANVAS_SIZE);
    G.camera.y = constrain(G.camera.y, 0, world.height - G.CANVAS_SIZE);
}