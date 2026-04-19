const DARK_COLOR = '#797A9E',
      LIGHT_COLOR = '#BBBDF6';
const color = {
    background:DARK_COLOR,
    debug:'#FF9900',
    eye:DARK_COLOR,
    object:LIGHT_COLOR,
    star:LIGHT_COLOR,
    text:'#9893DA',
};
const ship = {
    bodyWidth: 14,
    bodyHeight:20,
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
    accelMaxAt:300,
    damp:0.9,
    radius:20
};
const seed = 59;
const targetFrameRate = 60;
const cameraBlend = 0.1;
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
    strokeColor: LIGHT_COLOR,
    strokeWeight: 1
};
const signal = {
    pulseColor: LIGHT_COLOR,//'#72727E',
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
export const config = {
    cameraBlend,
    color,    
    oob,
    planets,
    seed,
    signal,
    ship,
    targetFrameRate,
};