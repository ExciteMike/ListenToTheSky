/// keep the angle between -PI and PI
export function wrapAngle(a) {
    a = a%TAU;
    return (a>PI) ? a-TAU :
           (a<-PI) ? a+TAU : a;
}
export function lerpAngle(a, b, t) {
    return a+wrapAngle(b-a)*t
}
export function smoothStep(x) {
    return x*x*(3-2*x);
}