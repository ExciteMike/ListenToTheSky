const NOISE = {
    p1:{}
};

NOISE.p1.driftX = ()=>(cos(millis()*0.001))*3;
NOISE.p1.driftY = ()=>(sin(millis()*0.002))*3;
NOISE.p1.drift = ()=>createVector(NOISE.p1.driftX(), NOISE.p1.driftY());