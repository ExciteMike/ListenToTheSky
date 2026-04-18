import { audio } from "./audio.js";
import { drawStars, makeStars } from "./stars.js";
import { noise } from "./noise.js";
import { doIntro } from "./intro.js";
import { world } from "./world.js";
import { G } from "./g.js";
import { config } from "./config.js";
G.ship = {
    x: world.center.x,
    y: world.center.y,
};
G.camera = {
    x: world.center.x,
    y: world.center.y,
}

function preload() {
    audio.preload();
}
window.preload=preload;

function setup() {
    document.getElementById("loading").remove();
    G.canvas = createCanvas(G.CANVAS_SIZE, G.CANVAS_SIZE);
    noiseSeed(config.seed);
    textFont(loadFont('assets/Goldman-Regular.ttf'));
    textAlign(CENTER, CENTER);
    makeStars();
}
window.setup=setup;

function draw() {
    background(config.color.background);

    drawStars()
    drawPlayer();
    doIntro(config.color.text);
}
window.draw=draw;

function drawPlayer() {
    noStroke();
    const drift = noise.p1.drift();
    let adjustedMouse = createVector(mouseX, mouseY);
    adjustedMouse.sub(drift);
    adjustedMouse.sub(G.CANVAS_SIZE/2, G.CANVAS_SIZE/2);
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
                    (mouseHeading-PI),
          bodyTilt = tiltScale * config.ship.bodyTiltScale * rawTilt,
          headTilt = tiltScale * config.ship.headTiltScale * rawTilt,
          finTilt = tiltScale * config.ship.finTiltScale * rawTilt,
          eyeShift = constrain(config.ship.eyeShiftScale * adjustedMouse.x, -config.ship.eyeShiftMax, config.ship.eyeShiftMax);
    push();
    translate(
        G.ship.x+noise.p1.driftX()-G.camera.x+G.CANVAS_SIZE/2,
        G.ship.y+noise.p1.driftY()-G.camera.y+G.CANVAS_SIZE/2);

        push();
            // body
            rotate(bodyTilt);
            fill(config.color.object);
            rect(-config.ship.bodyWidth/2,-config.ship.bodyHeight/2,config.ship.bodyWidth,config.ship.bodyHeight);

            // head
            push();
                translate(0, -config.ship.bodyHeight/2);
                rotate(headTilt-bodyTilt);
                fill(config.color.object);
                triangle(
                    -config.ship.bodyWidth/2, 0,
                    config.ship.bodyWidth/2, 0,
                                0, -config.ship.headHeight);
                arc(0, 0, config.ship.bodyWidth, config.ship.bodyWidth, 0, PI);

                // EYE
                circle(eyeShift, config.ship.eyeY, config.ship.eyeSize);
                fill(config.color.eye);
                circle(eyeShift, config.ship.eyeY, config.ship.eyeSize-2);
                fill(config.color.object);
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
}