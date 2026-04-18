import { config } from "./config.js";
import { G } from "./g.js";
import { world } from "./world.js";

export function drawBounds() {
    const hMargin = world.cellWidth/2,
          vMargin = world.cellHeight/2,
          top   = 0,
          left = 0,
          bottom = world.height,
          right = world.width,
          maxReach = 0.25 * G.CANVAS_SIZE;
    stroke(config.oob.wall);
    noFill();
    // top
    if (G.ship.y < top + vMargin) {
        const weight = map(G.ship.y, top + vMargin, top, 1, config.oob.wallWeight),
              reach  = map(G.ship.y, top + vMargin, top, 1, maxReach);
        strokeWeight(weight);
        const minX = max(left, G.ship.x - reach),
              maxX = min(right, G.ship.x + reach);
        line(minX, top, maxX, top);
    }
    // left
    if (G.ship.x < left + hMargin) {
        const weight = map(G.ship.x, left + hMargin, left, 1, config.oob.wallWeight),
              reach  = map(G.ship.x, left + hMargin, left, 1, maxReach);
        strokeWeight(weight);
        const minY = max(top, G.ship.y - reach),
              maxY = min(bottom, G.ship.y + reach);
        line(left, minY, left, maxY);
    }
    // bottom
    if (G.ship.y > bottom - vMargin) {
        const weight = map(G.ship.y, bottom - vMargin, bottom, 1, config.oob.wallWeight),
              reach  = map(G.ship.y, bottom - vMargin, bottom, 1, maxReach);
        strokeWeight(weight);
        const minX = max(left, G.ship.x - reach),
              maxX = min(right, G.ship.x + reach);
        line(minX, bottom, maxX, bottom);
    }
    // right
    if (G.ship.x > right - hMargin) {
        const weight = map(G.ship.x, right - hMargin, right, 1, config.oob.wallWeight),
              reach  = map(G.ship.x, right - hMargin, right, 1, maxReach);
        strokeWeight(weight);
        const minY = max(top,    G.ship.y - reach),
              maxY = min(bottom, G.ship.y + reach);
        line(right, minY, right, maxY);
    }
}

export function drawOobIndicator() {
    const mX = mouseX + G.camera.x,
          mY = mouseY + G.camera.y,
          shipR = config.ship.radius;
    if ((shipR < mX) &&
        (mX < world.width - shipR) &&
        (shipR < mY) &&
        (mY < world.height - shipR) )
    {
        return;
    }

    stroke(config.oob.border);
    strokeWeight(config.oob.strokeWeight);
    fill(config.oob.fill);
    const bigStep = config.oob.size / 2,
            smallStep = bigStep / 3;
    push();
        translate(mX, mY);
        beginShape();
        vertex(smallStep, 0);
        vertex(bigStep, bigStep-smallStep);
        vertex(bigStep-smallStep, bigStep);
        vertex(0, smallStep);
        vertex(-bigStep+smallStep, bigStep);
        vertex(-bigStep, bigStep-smallStep);
        vertex(-smallStep, 0);
        vertex(-bigStep, -bigStep+smallStep);
        vertex(-bigStep+smallStep, -bigStep);
        vertex(0, -smallStep);
        vertex(bigStep-smallStep, -bigStep);
        vertex(bigStep, -bigStep+smallStep);
        vertex(smallStep, 0);
        endShape();
    pop();
}