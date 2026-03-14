
// GENERAL SETUP
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
function getKeyUp(event) {
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
function getKeyDown(event) {
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
// spritesheets base class
class Spritesheet {
    nrows = 1;
    ncols = 1;
    img = new Image();
    nframes = 1;
    frameWidth = 1;
    frameHeight = 1;
    sheetx = 0; // stores the target coordinates between the update and draw steps.
    sheety = 0;

    update(frame){
        if (frame >= this.nframes) {
            frame = frame % this.nframes;
        }
        var _col = (frame % this.ncols); // get the column index within the sprite image
        var _row = (frame - _col) / this.ncols; // get the row index within the sprite image
        this.sheetx = _col * this.frameWidth;
        this.sheety = _row * this.frameHeight;
    }

    draw(context, x, y) {
        context.drawImage(this.img, 
            this.sheetx, this.sheety, 
            this.frameWidth, this.frameHeight, 
            x, y, 
            this.frameWidth, this.frameHeight);
    }

    constructor(_img, _nrows, _ncols, _imgwidth, _imgheight) {
        this.img.src = _img;
        this.nrows = _nrows;
        this.ncols = _ncols;
        this.nframes = _nrows * _ncols;
        this.frameWidth = _imgwidth / _nrows;
        this.frameHeight = _imgheight / _ncols;
    }
}
// objects
class Obj {
    x = 0;
    y = 0;
    spritesheet = undefined;
    frame = 0;
    constructor(ix=0, iy=0) {
        this.x = ix;
        this.y = iy;
    }

    update(_inputs) {

        // at the end of the step, update the sprite data to match current sprite frame
        this.spritesheet.update(this.frame);
    }
    
    draw(context) {
        // draw the sprite
        this.spritesheet.draw(context, this.x, this.y);
    }
}
class ObjCharacter extends Obj {
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/mc_spritesheet.png", 4, 5, 64, 80);
    }

    update(_inputs) {
        if (_inputs.rightp) {
            this.x += 8;
        }
        if (_inputs.leftp) {
            this.x += -8;
        }
        super.update(_inputs);
    }

    draw(context) {
        super.draw(context);
    }
}

// ROOM SETUP
// initialize the canvas stuff
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// get the background
const img_bg = new Image();
img_bg.src = "images/header-smaller.png";
const objChara = new ObjCharacter(8, 8);

// define the main cycles
function update() {
    objChara.update(inputs);

    resetKeys();
}

function draw() {
    ctx.drawImage(img_bg, 0, 0);
    objChara.draw(ctx);
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