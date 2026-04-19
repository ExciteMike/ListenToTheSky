import { config } from "./config.js";

let effects = [];

export function addEffect(x, y, dx, dy, dur, colorset) {
    const start = millis()*0.001,
          colori = random(colorset.length)|0,
          color = colorset[colori];
    effects.push({
        x,
        y,
        dx,
        dy,
        start,
        dur,
        color
    });
}
export function celebrationBurst(x, y, r) {
    const n=32, speed=250;
    for (let i=0;i<n;++i) {
        const theta = TAU*i/n,
              dx = cos(theta) * speed,
              dy = sin(theta) * speed;
        addEffect(x+r*cos(theta), y+r*sin(theta), dx, dy, 1, config.effects.celebratoryColors);
    }
}
export function drawEffects() {
    const t = millis()*0.001;
    for (let i=effects.length-1;i>=0;--i) {
        const {x, y, dx, dy, start, dur, color:c} = effects[i];
        let adjustedColor = color(c);
        adjustedColor.setAlpha(255 * constrain(map(t, start, start+dur, 1, 0), 0, 1));
        stroke(adjustedColor);
        strokeWeight(config.effects.strokeWeight);
        point(x+dx*(t-start), y+dy*(t-start));
        if (t-start > dur) {
            effects.splice(i, 1);
        }
    }
}