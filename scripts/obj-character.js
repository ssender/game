import * as Obj from "./obj-base.js";

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

export default ObjCharacter;