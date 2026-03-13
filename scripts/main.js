const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
const image = new Image();
image.src = "images/crosshair.png";

const img_bg = new Image();
img_bg.src = "images/header-smaller.png";


function drawThing(drawx, drawy) {
    ctx.drawImage(image, drawx, drawy);
}


let x = 0;
let y = 0;
let dx = 20;
let dy = 20;
function update(dt){

}
function draw() {
    ctx.drawImage(img_bg, 0, 0);
}

let start;

// When an Animation Frame is Requested, step is called, and is fed the time since the last frame through the argument timestamp
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = (timestamp - start)*0.001;
    // update the values of the world in game
    update(elapsed);
    // draw all the things
    draw();
    start = timestamp;
    requestAnimationFrame(step);
}

// The first call, initializes the first frame
requestAnimationFrame(step);