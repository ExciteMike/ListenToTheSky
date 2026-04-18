let song;

function preload() {
    soundFormats('mp3');
    song = loadSound('assets/Listening to the Quiet Sky B', loaded);
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