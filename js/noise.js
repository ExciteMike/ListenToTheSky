const driftX = ()=>(cos(millis()*0.001))*3,
    driftY = ()=>(sin(millis()*0.002))*3,
    drift = ()=>createVector(driftX(), driftY());

export const noise = {
    p1:{driftX, driftY, drift}
};