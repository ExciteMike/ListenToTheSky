const DARK_COLOR = 'hsl(238, 16%, 55%)',
      LIGHT_COLOR = '#BBBDF6';
const color = {
    background:DARK_COLOR,
    debug:'#FF9900',
    object:LIGHT_COLOR,
    star:LIGHT_COLOR,
    text:'#9893DA',
};
const cameraBlend = 0.1;
const effects = {
    celebratoryColors: [
        'hsl(58, 67%, 65%)',
        'hsl(118, 67%, 65%)',
        'hsl(358, 67%, 65%)'],
    strokeWeight: 16
};
const followers = {
    ease: 0.5,
    distance: 40,
    w: 25,
    h: 30,
    r: 4,
    boxColor: LIGHT_COLOR,
    textColor: DARK_COLOR,
};
const hud = {
    textColor: LIGHT_COLOR,
}
const oob = {
        border: '#FFCC00',
        fill: '#FF3399',
        strokeWeight: 2,
        size: 40,
        wall: LIGHT_COLOR,
        wallWeight: 14
};
const planets = {
    count: 100,
    minRadius: 25,
    maxRadius: 100,
    minFreq: 1/30,
    maxFreq: 1/300,
    fill: '#625F63',
    placementMargin: 150,
    strokeColor: LIGHT_COLOR,
    strokeWeight: 1,
};
const seed = 59;
const ship = {
    bodyWidth: 14,
    bodyHeight:20,
    color:LIGHT_COLOR,
    finsWidth:24,
    headHeight:15,
    eyeY:-3,
    bodyTiltScale:0.25,
    headTiltScale:1.2,
    finTiltScaleFIN_TILT_SCALE:-0.1,
    eyeShiftScale:0.05,
    eyeShiftMax:3,
    eyeSize:10,
    accelMax:5000,
    accelMaxAt:100,
    damp:0.9,
    radius:20
};
const signal = {
    pulseColor: LIGHT_COLOR,
    freq: 1/6,
    speed: 1000,
    strokeWeightMax: 16,
    maxPulses: 2,
    bubbleColor: LIGHT_COLOR,
    bubbleR: 4,
    bubbleOffset: 20,
    bubbleW: 40,
    bubbleH: 30,
    textColor: DARK_COLOR,
};
const targetFrameRate = 60;
export const config = {
    cameraBlend,
    color,
    effects,
    followers,
    hud,
    oob,
    planets,
    seed,
    signal,
    ship,
    targetFrameRate,
};