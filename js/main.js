import { audio } from "./audio.js";
import { drawStars, createStars } from "./stars.js";
import { noise } from "./noise.js";
import { doIntro } from "./intro.js";
import { world } from "./world.js";
import { G } from "./g.js";
import { config } from "./config.js";
import { lerpAngle } from "./math.js";
import { controlPlayer } from "./controls.js";
import { doCameraTransform, updateCamera } from "./camera.js";
import { drawBounds, drawOobIndicator } from "./bounds.js";
import { createPlanets, drawPlanets } from "./planets.js";
import { drawSignals, initSignals, updateSignals } from "./signals.js";
import { addEffect, drawEffects } from "./effects.js";
import { drawFollowers, updateFollowers } from "./followers.js";
import { drawHud } from "./hud.js";
import * as progression from "./progression.js";
G.ship = {
    ddx: 0,
    ddy: 0,
    dx: 0,
    dy: 0,
    followers:[],
    straightenFactor: 0,
    targetX: world.center.x,
    targetY: world.center.y,
    x: world.center.x,
    y: world.center.y,
};
G.camera = {
    x: world.center.x-G.CANVAS_SIZE/2,
    y: world.center.y-G.CANVAS_SIZE/2,
}

function preload() {
    audio.preload();
}
window.preload=preload;

function setup() {
    document.getElementById("loading").remove();
    G.canvas = createCanvas(G.CANVAS_SIZE, G.CANVAS_SIZE);
    frameRate(config.targetFrameRate);
    randomSeed(config.seed);
    noiseSeed(config.seed);
    textFont(loadFont('assets/Goldman-Regular.ttf'));
    textAlign(CENTER, CENTER);
    createStars();
    createPlanets();
    initSignals();
}
window.setup=setup;

function draw() {
    background(config.color.background);

    progression.check();
    controlPlayer();
    updateFollowers();
    updateSignals();
    updateCamera();

    push();
        doCameraTransform();
        drawStars();
        drawPlanets();
        drawBounds();
        drawPlayer();
        drawFollowers();
        drawSignals();
        drawEffects();
        drawOobIndicator();
    pop();
    drawHud();

    doIntro(config.color.text);
}
window.draw=draw;

function drawPlayer() {
    noStroke();
    const drift = noise.p1.drift();
    let adjustedMouse = createVector(mouseX, mouseY);
    adjustedMouse.add(G.camera.x, G.camera.y);
    adjustedMouse.sub(G.ship.x, G.ship.y);
    adjustedMouse.sub(drift);
    adjustedMouse.add(0, config.ship.bodyHeight/2);
    const mouseMag = adjustedMouse.mag(),
          mouseHeading = adjustedMouse.heading(),
          tiltScale = (mouseMag<config.ship.bodyHeight) ? adjustedMouse.mag()/config.ship.bodyHeight : 1,
          rawTilt = (mouseHeading < -0.75*PI) ? (mouseHeading+PI) : 
                    (mouseHeading < -0.5*PI)  ? map(mouseHeading, -0.75*PI, -0.5*PI, (mouseHeading+PI), 0) :
                    (mouseHeading < -0.25*PI) ? map(mouseHeading, -0.5*PI, -0.25*PI, 0, mouseHeading) :
                    (mouseHeading <  0.25*PI) ? mouseHeading :
                    (mouseHeading <   0.5*PI) ? map(mouseHeading, 0.25*PI, 0.5*PI, mouseHeading, 0) :
                    (mouseHeading <  0.75*PI) ? map(mouseHeading,  0.5*PI, 0.75*PI, 0, (mouseHeading - PI)) :
                    (mouseHeading-PI);
    let bodyTilt = tiltScale * config.ship.bodyTiltScale * rawTilt,
        headTilt = tiltScale * config.ship.headTiltScale * rawTilt,
        finTilt = tiltScale * config.ship.finTiltScale * rawTilt,
        eyeShift = constrain(config.ship.eyeShiftScale * adjustedMouse.x, -config.ship.eyeShiftMax, config.ship.eyeShiftMax);
    
    // straighten when moving
    const shipSpeed = mag(G.ship.dx, G.ship.dy),
          shipHeading = atan2(G.ship.dy, G.ship.dx);
    let t = shipSpeed / (shipSpeed + 100);
    finTilt  = lerpAngle(finTilt,  shipHeading+PI/2, t);
    headTilt = lerpAngle(headTilt, shipHeading+PI/2, t);
    bodyTilt = lerpAngle(bodyTilt, shipHeading+PI/2, t);
    eyeShift = lerp(eyeShift, 0, t);

    push();
        translate(
            G.ship.x+noise.p1.driftX(),
            G.ship.y+noise.p1.driftY());

        push();
            // body
            rotate(bodyTilt);
            fill(config.ship.color);
            rect(-config.ship.bodyWidth/2,-config.ship.bodyHeight/2,config.ship.bodyWidth,config.ship.bodyHeight);

            // head
            push();
                translate(0, -config.ship.bodyHeight/2);
                rotate(headTilt-bodyTilt);
                triangle(
                    -config.ship.bodyWidth/2, 0,
                    config.ship.bodyWidth/2, 0,
                    0, -config.ship.headHeight);
                arc(0, 0, config.ship.bodyWidth, config.ship.bodyWidth, 0, PI);

                // EYE
                circle(eyeShift, config.ship.eyeY, config.ship.eyeSize);
                fill(config.color.background);
                circle(eyeShift, config.ship.eyeY, config.ship.eyeSize-2);
                fill(config.ship.color);
                circle(eyeShift, config.ship.eyeY, config.ship.eyeSize-4);
            pop();
            
            // fins
            push();
                translate(0, config.ship.bodyHeight/2);
                rotate(finTilt-bodyTilt);
                triangle(
                    -config.ship.finsWidth/2, 2,
                    config.ship.finsWidth/2, 2,
                    0, -config.ship.bodyHeight/2);
            pop();
        pop();
    pop();

    // effects
    if (random() < 0.5) {
        let pos = createVector((random()-0.5) * config.ship.bodyWidth, config.ship.bodyHeight);
        pos.rotate(bodyTilt);
        pos.add(noise.p1.driftX(), noise.p1.driftY());
        pos.add(G.ship.x, G.ship.y);
        let vel = createVector(0, 100);
        vel.rotate(random(bodyTilt-PI/4, bodyTilt+PI/4));
        addEffect(
            pos.x,
            pos.y,
            vel.x,
            vel.y,
            0.25,
            [config.ship.color]);
    }
}
