import { config } from "./config.js";
import { celebrationBurst } from "./effects.js";
import { addFollower } from "./follower.js";
import { G } from "./g.js";
import { getPlanetXY, getRandomPlanet } from "./planets.js";

const signalers = [];

function addSignalersUpTo(n) {
    let sanity = 100;
    while (signalers.length < n) {
        const planet = getRandomPlanet(),
              phase = random(TAU);
        if (!planetInUse(planet, phase)) {
            signalers.push({planet, phase});
        }
        --sanity;
        if (sanity < 0) {
            throw new Error("issue detected in signal placement code");
        }
    }
}

function drawPulse(s, n) {
    const {planet, phase} = s,
          {r} = planet,
          {x,y} = getPlanetXY(planet),
          theta = (phase + TAU*millis()*0.001*config.signal.freq) % TAU + n*TAU,
          fadeLimit = config.signal.maxPulses * TAU,
          d = map(theta, 0, TAU, r, config.signal.speed/config.signal.freq);
    let adjustedColor = color(config.signal.pulseColor);
    adjustedColor.setAlpha(map(theta, 0, fadeLimit, 255, 0));
    stroke(adjustedColor);
    strokeWeight(config.signal.strokeWeightMax);
    noFill();
    circle(x, y, 2*d);
}

function drawSignal(s) {
    for (let i=0;i<config.signal.maxPulses;++i) {
        drawPulse(s,i);
    }
    drawBubble(s);
}

export function drawSignals() {
    signalers.forEach(drawSignal);
}

function drawBubble(s) {
    const want = s.hasOwnProperty('want') ? s.want : undefined,
          has = s.hasOwnProperty('has') ? s.has : undefined;
    if (!want && !has) {
        return;
    }
    const {planet} = s,
          {r} = planet,
          {x,y} = getPlanetXY(planet),
          SQRTHALF = sqrt(0.5),
          step = SQRTHALF*(r + config.signal.bubbleOffset);
    noStroke();
    fill(config.signal.bubbleColor);
    rect(
        x+step-0.5*config.signal.bubbleW, 
        y-step-0.5*config.signal.bubbleH,
        config.signal.bubbleW,
        config.signal.bubbleH,
        config.signal.bubbleR);
    triangle(
        x+step-0.3*config.signal.bubbleW, y-step,
        x+step+0.3*config.signal.bubbleW, y-step,
        x+step-0.3*config.signal.bubbleW, y-step+config.signal.bubbleH,
    );
    fill(config.signal.textColor);
    if (want) {
        text(want+'?', x+step, y-step);
    }
    if (has) {
        text(has+'!', x+step, y-step);
    }
}

function clearSignalers() {
    signalers.length = 0;
}

export function initSignals() {
    clearSignalers();
    addSignalersUpTo(2);
    signalers[0].want = 'a';
    signalers[1].has = 'a';
}

function planetInUse(p) {
    for (const {planet:used} of signalers) {
        if (used == p) {
            return true;
        }
    }
    return false;
}

export function updateSignals() {
    for(let i=signalers.length-1;i>=0;--i) {
        const s = signalers[i],
              want = s.hasOwnProperty('want') ? s.want : undefined,
              has = s.hasOwnProperty('has') ? s.has : undefined,
              {planet} = s,
              {r} = planet,
              {x,y} = getPlanetXY(planet),
              shipDist = dist(G.ship.x, G.ship.y, x, y);
        if (shipDist < r+config.ship.radius) {
            if (has) {
                addFollower(x+r, y-r, has);
                // remove from list
                signalers.splice(i,1);
            } else if (want && shipHas(want)) {
                // celebratory effects
                celebrationBurst(x, y, r);
                // TODO - increment counter
                // TODO - possibly trigger next wave
                // remove from list
                signalers.splice(i,1);
            }
        }
    }
}