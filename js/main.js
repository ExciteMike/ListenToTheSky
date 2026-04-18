import { audio } from "./audio.js";
import { drawStars, makeStars } from "./stars.js";
import { noise } from "./noise.js";
const SEED=59,
ROCKET_WIDTH=14,
ROCKET_HEIGHT=20,
FINS_WIDTH=24,
HEAD_HEIGHT=15,
EYE_Y=0,
BODY_TILT_SCALE=0.25,
HEAD_TILT_SCALE=1,
FIN_TILT_SCALE=-0.1,
EYE_SHIFT_SCALE=0.02,
EYE_SHIFT_MAX=3,
EYE_SIZE=10;
let p1 = {
    x: WORLD.center.x,
    y: WORLD.center.y,
};
G.camera = {
    x: WORLD.center.x,
    y: WORLD.center.y,
}

function preload() {
    audio.preload();
}
window.preload=preload;

function setup() {
    document.getElementById("loading").remove();
    G.canvas = createCanvas(G.CANVAS_SIZE, G.CANVAS_SIZE);
    noiseSeed(SEED);
    textFont(loadFont('assets/Goldman-Regular.ttf'));
    textAlign(CENTER, CENTER);
    makeStars();
}
window.setup=setup;

function draw() {
    background(COLOR.BACKGROUND);

    drawStars()
    drawPlayer();
    doIntro(COLOR.TEXT);
}
window.draw=draw;

function drawPlayer() {
    noStroke();
    const drift = noise.p1.drift();
    let adjustedMouse = createVector(mouseX, mouseY);
    adjustedMouse.sub(drift);
    adjustedMouse.sub(G.CANVAS_SIZE/2, G.CANVAS_SIZE/2);
    adjustedMouse.add(0, ROCKET_HEIGHT/2);
    const mouseMag = adjustedMouse.mag(),
          mouseHeading = adjustedMouse.heading(),
          tiltScale = (mouseMag<ROCKET_HEIGHT) ? adjustedMouse.mag()/ROCKET_HEIGHT : 1,
          rawTilt = (mouseHeading < -0.75*PI) ? (mouseHeading+PI) : 
                    (mouseHeading < -0.5*PI)  ? map(mouseHeading, -0.75*PI, -0.5*PI, (mouseHeading+PI), 0) :
                    (mouseHeading < -0.25*PI) ? map(mouseHeading, -0.5*PI, -0.25*PI, 0, mouseHeading) :
                    (mouseHeading <  0.25*PI) ? mouseHeading :
                    (mouseHeading <   0.5*PI) ? map(mouseHeading, 0.25*PI, 0.5*PI, mouseHeading, 0) :
                    (mouseHeading <  0.75*PI) ? map(mouseHeading,  0.5*PI, 0.75*PI, 0, (mouseHeading - PI)) :
                    (mouseHeading-PI),
          bodyTilt = tiltScale * BODY_TILT_SCALE * rawTilt,
          headTilt = tiltScale * HEAD_TILT_SCALE * rawTilt,
          finTilt = tiltScale * FIN_TILT_SCALE * rawTilt,
          eyeShift = constrain(EYE_SHIFT_SCALE * adjustedMouse.x, -EYE_SHIFT_MAX, EYE_SHIFT_MAX);
    push();
    translate(
        p1.x+noise.p1.driftX()-G.camera.x+G.CANVAS_SIZE/2,
        p1.y+noise.p1.driftY()-G.camera.y+G.CANVAS_SIZE/2);

        push();
            // body
            rotate(bodyTilt);
            fill(COLOR.OBJECT);
            rect(-ROCKET_WIDTH/2,-ROCKET_HEIGHT/2,ROCKET_WIDTH,ROCKET_HEIGHT);

            // head
            push();
                translate(0, -ROCKET_HEIGHT/2);
                rotate(headTilt-bodyTilt);
                fill(COLOR.OBJECT);
                triangle(
                    -ROCKET_WIDTH/2, 0,
                    ROCKET_WIDTH/2, 0,
                                0, -HEAD_HEIGHT);
                arc(0, 0, ROCKET_WIDTH, ROCKET_WIDTH, 0, PI);

                // EYE
                circle(eyeShift, EYE_Y, EYE_SIZE);
                fill(COLOR.EYE);
                circle(eyeShift, EYE_Y, EYE_SIZE-2);
                fill(COLOR.OBJECT);
                circle(eyeShift, EYE_Y, EYE_SIZE-4);
            pop();
            
            // fins
            push();
                translate(0, ROCKET_HEIGHT/2);
                rotate(finTilt-bodyTilt);
                triangle(
                    -FINS_WIDTH/2, 2,
                    FINS_WIDTH/2, 2,
                    0, -ROCKET_HEIGHT/2);
            pop();
        pop();
    pop();
}