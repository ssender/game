
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
        this.tilex = Math.round(ix/16);
        this.tiley = Math.round(iy/16);
        this.spritesheet = new Spritesheet("images/mc_spritesheet.png", 4, 5, 64, 80);
    }

    update(_inputs) {
        if (this.moveprogress === 0) {
            if (_inputs.right) {
                this.facing = 2;
                if (tilemap[this.tilex + 1][this.tiley] < 32) {
                    this.moveprogress = 1;
                    this.tilex += 1;
                }
            }else if (_inputs.left) {
                this.facing = 4;
                if (tilemap[this.tilex - 1][this.tiley] < 32) {
                    this.moveprogress = 1;
                    this.tilex += -1;
                }
            }else if (_inputs.up) {
                this.facing = 1;
                if (tilemap[this.tilex][this.tiley - 1] < 32) {
                    this.moveprogress = 1;
                    this.tiley += -1;
                }
            }else if (_inputs.down) {
                this.facing = 3;
                if (tilemap[this.tilex][this.tiley + 1] < 32) {
                    this.moveprogress = 1;
                    this.tiley += 1;
                }
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
        this.spritesheet.draw(context, this.x, this.y - 3);
    }
}

// ROOM SETUP
// initialize the canvas stuff
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// get the background
const img_bg = new Image();
img_bg.src = "images/header-smaller.png";
// get the tileset image
const img_ts = new Image();
img_ts.src = "images/ts1.png";
// SETUP SPECIFIC TO THIS ROOM
// initialize the character object
const objChara = new ObjCharacter(8, 8);
// define the tilemap
let tilemap = [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,16,16,16,0,0,32],[32,0,0,0,0,16,16,16,0,32],[32,0,0,0,0,0,16,0,0,32],[32,0,0,48,56,0,0,0,0,32],[32,0,48,56,0,0,0,32,0,32],[32,48,56,48,56,0,0,0,0,32],[32,0,48,56,0,0,0,0,0,32],[32,48,56,0,8,0,0,32,0,32],[32,0,0,0,8,8,8,0,0,32],[32,48,56,0,0,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,48,56,48,56,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,0,0,48,56,0,8,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]]																

// define the main cycles
function update() {
    objChara.update(inputs);
    resetKeys();
}
function drawtilemap() {
    for (var tx = 1; tx<16; tx++) {
        for (var ty = 1; ty < 9; ty++) {
            var sx = tilemap[tx][ty] % 8;
            var sy = (tilemap[tx][ty] - sx)/8;
            ctx.drawImage(img_ts, sx*16, sy*16, 16, 16, tx*16 - 8, ty*16 - 8, 16, 16);
        }
    }
}
function draw() {
    ctx.drawImage(img_bg, 0, 0);
    drawtilemap();
    objChara.draw(ctx);
}

// MAIN LOOP
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