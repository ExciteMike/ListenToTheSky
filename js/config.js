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
    eyeY:0,
    bodyTiltScale:0.25,
    headTiltScale:1,
    finTiltScaleFIN_TILT_SCALE:-0.1,
    eyeShiftScale:0.02,
    eyeShiftMax:3,
    eyeSize:10,
};
const seed = 59;
export const config = {
    color,
    seed,
    ship
};