import { playBump } from "./audio.js";
import { config } from "./config.js";
import { G } from "./g.js";
import { world } from "./world.js";

export function controlPlayer() {
    const fps = getTargetFrameRate(),
          timeStep = 1/fps;
    // mouse sets target
    if (mouseIsPressed) {
        const mX = mouseX + G.camera.x,
              mY = mouseY + G.camera.y,
              shipR = config.ship.radius;
        if ((shipR < mX) &&
            (mX < world.width - shipR) &&
            (shipR < mY) &&
            (mY < world.height - shipR) )
        {
            G.ship.targetX = mouseX + G.camera.x;
            G.ship.targetY = mouseY + G.camera.y;
        }
    }

    const ox = G.ship.targetX - G.ship.x,
          oy = G.ship.targetY - G.ship.y,
          d = max(mag(ox,oy), 1),
          nx = ox/d,
          ny = oy/d,
          constrainedD = min(d, config.ship.accelMaxAt),
          accelMag = map(constrainedD, 0, config.ship.accelMaxAt, 0, config.ship.accelMax),
          ddx = accelMag * nx,
          ddy = accelMag * ny;
    G.ship.x += G.ship.dx * 0.5 * timeStep;
    G.ship.y += G.ship.dy * 0.5 * timeStep;
    G.ship.dx += ddx * timeStep;
    G.ship.dy += ddy * timeStep;
    G.ship.x += G.ship.dx * 0.5 * timeStep;
    G.ship.y += G.ship.dy  * 0.5 * timeStep;
    G.ship.dx *= config.ship.damp;
    G.ship.dy *= config.ship.damp;
    G.ship.ddx = ddx;
    G.ship.ddy = ddy;

    enforceBounds();
}
function enforceBounds() {
    const r = config.ship.radius;
    if (G.ship.x < r) {
        G.ship.x = r;
        G.ship.dx = max(0, G.ship.dx);
        G.ship.ddx = max(0, G.ship.ddx);
        playBump();
    }
    if (G.ship.x > world.width - r) {
        G.ship.x = world.width - r;
        G.ship.dx = min(0, G.ship.dx);
        G.ship.ddx = min(0, G.ship.ddx);
        playBump();
    }
    if (G.ship.y < r) {
        G.ship.y = r;
        G.ship.dy = max(0, G.ship.dy);
        G.ship.ddy = max(0, G.ship.ddy);
        playBump();
    }
    if (G.ship.y > world.height - r) {
        G.ship.y = world.height - r;
        G.ship.dy = min(0, G.ship.dy);
        G.ship.ddy = min(0, G.ship.ddy);
        playBump();
    }
}