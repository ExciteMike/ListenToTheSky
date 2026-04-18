import { G } from "./g.js";
let song;

function preload() {
    soundFormats('mp3');
    const asset = 'assets/Listening to the Quiet Sky B';
    console.log('Loading '+asset+'.mp3');
    song = loadSound(asset, loaded);
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

export const audio = {preload};