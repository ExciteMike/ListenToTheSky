import { audio } from "./audio.js";
import { drawStars, makeStars } from "./stars.js";
import { noise } from "./noise.js";
import { doIntro } from "./intro.js";
import { world } from "./world.js";
import { G } from "./g.js";
import { config } from "./config.js";
import { lerpAngle } from "./math.js";
import { controlPlayer } from "./controls.js";
G.ship = {
    ddx: 0,
    ddy: 0,
    dx: 0,
    dy: 0,
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
    noiseSeed(config.seed);
    textFont(loadFont('assets/Goldman-Regular.ttf'));
    textAlign(CENTER, CENTER);
    makeStars();
}
window.setup=setup;

function draw() {
    background(config.color.background);

    controlPlayer();

    push();
    doCameraTransform();
    drawStars();
    drawPlayer();
    pop();

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
                    (mouseHeading-PI);
    let bodyTilt = tiltScale * config.ship.bodyTiltScale * rawTilt,
        headTilt = tiltScale * config.ship.headTiltScale * rawTilt,
        finTilt = tiltScale * config.ship.finTiltScale * rawTilt,
        eyeShift = constrain(config.ship.eyeShiftScale * adjustedMouse.x, -config.ship.eyeShiftMax, config.ship.eyeShiftMax);
    
    // straighten when moving
    const targetStraighten = mouseIsPressed ? 1/*map(sin(mouseHeading), -1, 1, 0, 1)*/ : 0;
    let t = G.ship.straightenFactor = lerp(G.ship.straightenFactor, targetStraighten, config.ship.straightenBlend);
    finTilt  = lerpAngle(finTilt,  mouseHeading+PI/2, t);
    headTilt = lerpAngle(headTilt, mouseHeading+PI/2, t);
    bodyTilt = lerpAngle(bodyTilt, mouseHeading+PI/2, t);
    eyeShift = lerp(eyeShift, 0, t);

    push();
    translate(
        G.ship.x+noise.p1.driftX(),
        G.ship.y+noise.p1.driftY());

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

function doCameraTransform() {
    translate(
        -G.camera.x,
        -G.camera.y);
}