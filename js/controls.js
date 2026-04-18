import { config } from "./config.js";
import { G } from "./g.js";

export function controlPlayer() {
    const fps = getTargetFrameRate(),
          timeStep = 1/fps;
    // mouse sets target
    if (mouseIsPressed) {
        G.ship.targetX = mouseX + G.camera.x;
        G.ship.targetY = mouseY + G.camera.y;
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
    if (isNaN(ox+oy+d+ nx+ ny+ constrainedD+ accelMag)) {
        console.log(ox, oy, d, nx, ny, constrainedD, accelMag);
        throw new Error();
    }
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
}