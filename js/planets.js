import { config } from "./config.js";
import { world } from "./world.js";

let planets = [];

function addPlanet() {
    const {minRadius, maxRadius, minFreq, maxFreq} = config.planets, 
          r = random(minRadius, maxRadius),
          x = random(world.width),
          y = random(world.height),
          {nearest, d} = findNearestPlanet(x, y);
    if ((nearest == undefined) || (d > max(r, nearest.r))) {
        const phase = random(TAU),
              freq = map(r, minRadius, maxRadius, minFreq, maxFreq);
        planets.push({x,y,r,phase,freq});
    }
}

export function createPlanets() {
    while (planets.length < config.planets.count) {
        addPlanet();
    }
}

export function drawPlanets() {
    planets.forEach(drawPlanet);
}

function drawPlanet(planet) {
    const {x,y} = getPlanetXY(planet),
          {r} = planet;
    fill(config.planets.fill);
    stroke(config.planets.strokeColor);
    strokeWeight(config.planets.strokeWeight);
    circle(x, y, 2*r);
}

export function findNearestPlanet(x, y) {
    let best = undefined,
        bestDist = Infinity;
    for (const candidate of planets) {
        const candidateDist = dist(x, y, candidate.x, candidate.y);
        if (candidateDist < bestDist) {
            bestDist = candidateDist;
            best = candidate;
        }
    }
    return {p:best, d:bestDist};
}

export function getRandomPlanet() {
    const i = (random()*planets.length)|0;
    return planets[i];
}

export function getPlanetXY(planet) {
    const {x,y,r,phase,freq} = planet,
          wobbleR = r,
          theta = phase + TAU*millis()*0.001*freq,
          wobX = wobbleR * cos(theta),
          wobY = wobbleR * sin(2*theta);
    return {x:x+wobX, y:y+wobY};
}