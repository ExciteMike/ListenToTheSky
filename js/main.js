const PALETTE1 = [
    '#A2D6F9',
    '#502F4C',
    '#70587C',
    '#C8B8DB',
    '#F9F4F5',
],
BACKGROUND_COLOR='#A2D6F9',
DISTANT_OBJECT_COLOR='#1E96FC',
OBJECT_COLOR='#072AC8',
CHARACTER_COLOR='#FFC600',
LOUD_COLOR='#FCF300',
CANVAS_SIZE=800,
SEED=59;
let p1 = {
    x: WORLD.center.x,
    y: WORLD.center.y,
};

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    noiseSeed(SEED);
    textFont(loadFont('assets/Goldman-Regular.ttf'));
    textAlign(CENTER, CENTER);
}

function draw() {
    background(BACKGROUND_COLOR);

    doIntro(OBJECT_COLOR);
}