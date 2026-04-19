import { G } from "./g.js";
let song;
let deliver;
let pickup;
let bump;

function preload() {
    soundFormats('mp3');
    const asset = 'assets/Listening to the Quiet Sky B';
    console.log('Loading '+asset+'.mp3');
    song = loadSound(asset, loaded);
    deliver = loadSound('assets/deliver');
    pickup = loadSound('assets/pickup');
    bump = loadSound('assets/bump');
}

function loaded() {
    if (G.canvas) {
        console.log('Loaded. Click canvas to play.');
        G.canvas.mouseClicked(play);
    } else {
        console.log('Loaded. Click window to play.');
        window.mouseClicked = play;
    }
}
function play() {
    if (!song.isPlaying()) {
        song.loop();
    }
}
export function playBump() {
    bump.play();
}
export function playDeliver() {
    deliver.play();
}
export function playPickup() {
    pickup.play();
}

export const audio = {preload};