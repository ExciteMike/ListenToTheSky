import { config } from "./config.js";
import { G } from "./g.js";

function getETA(x1,y1,x2,y2) {
    const d = sqrt(sq(x2-x1)+sq(y2-y1));
    return d / config.ship.preferredSpeed;
}

function controlAxis(x, dx, tx, eta, timeStep) {
    const offset = tx - x;
    if ((abs(offset) < 0.5) || (eta<timeStep)) {
        return {x:tx, dx:0};
    }
    const tSq = eta*eta,
          tCu = tSq*eta,
          A = (dx*eta-2*offset)/tCu,
          B = (3*offset-2*dx*eta)/tSq,
          C = dx,
          D = x,
          timeStepSq = timeStep*timeStep,
          timeStepCu = timeStepSq*timeStep,
          newX = A*timeStepCu + B*timeStepSq + C*timeStep + D,
          newDx =3*A*timeStepSq + 2*B*timeStep + C;
    return {x:newX,dx:newDx};
}

export function controlPlayer() {
    // mouse sets target
    if (mouseIsPressed) {
        G.ship.targetX = mouseX + G.camera.x;
        G.ship.targetY = mouseY + G.camera.y;
    }

    const fps = getTargetFrameRate(),
          timeStep = 1/fps,
          eta = getETA(G.ship.x, G.ship.y, G.ship.targetX, G.ship.targetY),
          {x, dx}=controlAxis(G.ship.x, G.ship.dx, G.ship.targetX, eta, timeStep),
          {x:y, dx:dy}=controlAxis(G.ship.y, G.ship.dy, G.ship.targetY, eta, timeStep);
    G.ship.ddx = (dx - G.ship.dx) * fps;
    G.ship.ddy = (dy - G.ship.dy) * fps;
    G.ship.dx = dx;
    G.ship.dy = dy;
    G.ship.x = x;
    G.ship.y = y;
}