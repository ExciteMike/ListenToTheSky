const _LIGHT_COLOR = '#797A9E',
      _DARK_COLOR = '#BBBDF6';
const color = {
    background:_LIGHT_COLOR,
    debug:'#FF9900',
    eye:_LIGHT_COLOR,
    extra:'#72727E',
    extraextra:'#625F63',
    object:_DARK_COLOR,
    star:_DARK_COLOR,
    text:'#9893DA',
};
const ship = {
    bodyWidth: 14,
    bodyHeight:20,
    finsWidth:24,
    headHeight:15,
    eyeY:1,
    bodyTiltScale:0.25,
    headTiltScale:1,
    finTiltScaleFIN_TILT_SCALE:-0.1,
    eyeShiftScale:0.05,
    eyeShiftMax:3,
    eyeSize:10,
    accelMax:2000,
    accelMaxAt:300,
    damp:0.97
};
const seed = 59;
const targetFrameRate = 60;
const cameraBlend = 0.1;
export const config = {
    cameraBlend,
    color,
    seed,
    ship,
    targetFrameRate,
};