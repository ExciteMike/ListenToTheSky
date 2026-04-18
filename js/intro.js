/// t - current time
/// s - start time
/// d - total duration (including fades)
/// fi - fade in time
/// fo - fade out time
function introTextColor(inColor, t, s, d, fi, fo) {
    const opacity = (t < s) ? 0 : 
                    (t < s+fi) ? map(t, s, s+fi, 0, 255) :
                    (t < s+d-fo) ? 255 :
                    (t < s+d) ? map(t, s+d-fo, s+d, 255, 0) :
                    0;
    let fadedColor = color(inColor);
    fadedColor.setAlpha(opacity);
    return fadedColor;
}

function doIntro(inColor) {
    const t = millis();
    if (t > 7500) {
        return;
    }
    const x = lerp(CANVAS_SIZE*0.45, CANVAS_SIZE*0.7, pow(t/7500,2));
    textSize(72);
    noStroke();
    fill(introTextColor(inColor, t, 500, 5000, 1000, 2000));
    text('Listen to the Sky', x, CANVAS_SIZE*0.4);
    
    textSize(24);
    fill(introTextColor(inColor, t, 1500, 6000, 2000, 3000));
    text('touch/click to move', x, CANVAS_SIZE*0.6);
}