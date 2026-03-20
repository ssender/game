
// GENERAL SETUP ------------------------------
// inputs
const inputs = {
    left : false,
    right : false,
    up : false,
    down : false,
    leftp : false,
    rightp : false,
    upp : false,
    downp : false,
    pad1 : false,
    pad1p : false
}
function getKeyDown(event) {
    if (event.code === "ArrowLeft") {
        inputs.left = true;
        inputs.leftp = true;
    } else if (event.code === "ArrowRight") {
        inputs.right = true;
        inputs.rightp = true;
    } else if (event.code === "ArrowUp") {
        inputs.up = true;
        inputs.upp = true;
    } else if (event.code === "ArrowDown") {
        inputs.down = true;
        inputs.downp = true;
    } else if (event.code === "KeyZ") {
        inputs.pad1 = true;
        inputs.pad1p = true;
    } 
}
function getKeyUp(event) {
    if (event.code === "ArrowLeft") {
        inputs.left = false;
    } else if (event.code === "ArrowRight") {
        inputs.right = false;
    } else if (event.code === "ArrowUp") {
        inputs.up = false;
    } else if (event.code === "ArrowDown") {
        inputs.down = false;
    } else if (event.code === "KeyZ") {
        inputs.pad1 = false;
    } 
}
function resetKeys(){
    inputs.leftp = false;
    inputs.rightp = false;
    inputs.upp = false;
    inputs.downp = false;
}
document.addEventListener("keydown", getKeyDown);
document.addEventListener("keyup", getKeyUp);

// objects

import room from "./room1.js";

// ROOM SETUP ------------------------------
// initialize the canvas stuff
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// define the main cycles
function update() {
    room.objects.forEach((obj) => obj.update(inputs, room))
    resetKeys();
}
function drawtilemap() {
    var _tilesetimg = room.img_ts;
    for (var tx = 1; tx<16; tx++) {
        for (var ty = 1; ty < 9; ty++) {
            var sx = room.tilemap[tx][ty] % 8;
            var sy = (room.tilemap[tx][ty] - sx)/8;
            ctx.drawImage(_tilesetimg, sx*16, sy*16, 16, 16, tx*16 - 8, ty*16 - 8, 16, 16);
        }
    }
}
function draw() {
    // background
    ctx.drawImage(room.img_bg, 0, 0);
    // tilemap
    drawtilemap();
    // objects
    objects.forEach((obj) => obj.draw(ctx));
    // frame
    ctx.drawImage(room.img_fg, 0, 0);
}

// MAIN LOOP ------------------------------
// When an Animation Frame is Requested, step is called, and is fed the time since the last frame through the argument timestamp
let start;
let dt = 0;
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    dt += (timestamp - start)*0.001;
    if (dt >= 0.025) {
        // update the values of the world in game
        update();
        // draw all the things
        draw();
        dt = 0;
    }
    start = timestamp;
    requestAnimationFrame(step);
}

// The first call, initializes the first frame
requestAnimationFrame(step);