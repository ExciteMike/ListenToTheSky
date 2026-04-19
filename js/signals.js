import { config } from "./config.js";
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
    let adjustedColor = color(config.signal.color);
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
}

export function drawSignals() {
    signalers.forEach(drawSignal);
}

function clearSignalers() {
    signalers.length = 0;
}

export function initSignals() {
    clearSignalers();
    addSignalersUpTo(1);
}

function planetInUse(p) {
    for (const {planet:used} of signalers) {
        if (used == p) {
            return true;
        }
    }
    return false;
}