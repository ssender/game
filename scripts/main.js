
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
    moving = false;
    moveprogress = 0;
    aframe = 0;
    aclock = 0;
    facing = 3; // 1-up, 2-right, 3-down, 4-left
    constructor(ix=0, iy=0) {
        super(ix, iy);
        this.spritesheet = new Spritesheet("images/mc_spritesheet.png", 4, 5, 64, 80);
    }

    update(_inputs) {
        if (this.moveprogress === 0) {
            if (_inputs.right && this.x < 248) {
                this.facing = 2;
                this.moveprogress = 1;
            }
            if (_inputs.left && this.x > 8) {
                this.facing = 4;
                this.moveprogress = 1;
            }
            if (_inputs.up && this.y > 8) {
                this.facing = 1;
                this.moveprogress = 1;
            }
            if (_inputs.down && this.y < 136) {
                this.facing = 3;
                this.moveprogress = 1;
            }
        }
        
        if (this.moveprogress > 0) {
            switch (this.facing) {
                case 1:
                    this.y += -1;
                    break;
                case 2:
                    this.x += 1;
                    break;
                case 3:
                    this.y += 1;
                    break;
                case 4:
                    this.x += -1;
                    break;
            }
            this.moveprogress += 1;
            if (this.moveprogress > 16) {
                this.moveprogress = 0;
            }
            this.aclock += 1;
            if (this.aclock >= 6) {
                this.aframe += 1;
                this.aclock = 0;
                if (this.aframe >= 5) {this.aframe = 1;}
            }
        } else {
            this.aframe = 0;
            this.aclock = 0;
        }
        this.frame = (this.facing - 1)*5 + this.aframe;
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
let dt = 0;
// When an Animation Frame is Requested, step is called, and is fed the time since the last frame through the argument timestamp
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