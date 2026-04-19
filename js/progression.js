import { newSignals, numSignals } from "./signals.js";

let deliveries = 0;

export function countDelivery() {
    deliveries += 1;
}

export function check() {
    if ((deliveries == 1)&&(numSignals() == 0)) {
        newSignals(['b','c']);
    }
    if ((deliveries == 3)&&(numSignals() == 0)) {
        newSignals(['d','e', 'f']);
    }
    if ((deliveries == 6)&&(numSignals() == 0)) {
        newSignals(['g','h', 'i', 'j']);
    }
    if ((deliveries == 10)&&(numSignals() == 0)) {
        // hud will start displaying the victory message
    }
}