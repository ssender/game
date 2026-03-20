import Obj from "./obj-base.js";
import Spritesheet from "./sprsheet-base.js";

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

    update(_inputs, _room) {
        var _tilemap = _room.tilemap;
        var _targettilex = this.tilex;
        var _targettiley = this.tiley;
        if (this.moveprogress === 0) {
            if (_inputs.right) {
                this.facing = 2;
                if (_tilemap[this.tilex + 1][this.tiley] < 32) {
                    _targettilex += 1;
                }
            }else if (_inputs.left) {
                this.facing = 4;
                if (_tilemap[this.tilex - 1][this.tiley] < 32) {
                    _targettilex += -1;
                }
            }else if (_inputs.up) {
                this.facing = 1;
                if (_tilemap[this.tilex][this.tiley - 1] < 32) {
                    _targettiley += -1;
                }
            }else if (_inputs.down) {
                this.facing = 3;
                if (_tilemap[this.tilex][this.tiley + 1] < 32) {
                    _targettiley += 1;
                }
            }
            if (_targettilex != this.tilex || _targettiley != this.tiley) {
                this.moveprogress = 1;
                var _objects_in_target_tile = _room.objects_at_tile(_targettilex, _targettiley);
                for (var _i = 0; _i < _objects_in_target_tile.length; _i++) {
                    if (_objects_in_target_tile[_i].has_collision) {this.moveprogress = 0};
                    break;
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
        super.update(_inputs, _room);
    }

    draw(_context) {
        this.spritesheet.draw(_context, this.x, this.y - 3);
    }
}

export default ObjCharacter;