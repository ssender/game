import("./game-objects/obj-character.js");

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

const img_bg = new Image();
img_bg.src = "images/header-smaller.png";


const chara = new ObjCharacter(16, 16);

function update() {
    objChara.update();
}

function draw() {
    ctx.drawImage(img_bg, 0, 0);
    objChara.draw();
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