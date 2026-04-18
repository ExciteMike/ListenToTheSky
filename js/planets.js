import { config } from "./config.js";
import { world } from "./world.js";

let planets = [];

function addPlanet() {
    const {minRadius, maxRadius} = config.planets, 
          r = random(minRadius, maxRadius),
          x = random(world.width),
          y = random(world.height);
    planets.push({x,y,r});
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
    const {x,y,r} = planet;
    fill(config.planets.fill);
    stroke(config.planets.strokeColor);
    strokeWeight(config.planets.strokeWeight);
    circle(x, y, 2*r);
}