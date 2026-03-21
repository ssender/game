import Spritesheet from "./sprsheet.js";
const room = {
    img_bg : new Image(),
    img_fg : new Image(),
    objects : [],
    img_ts : new Spritesheet("images/ts1.png", 8, 8),
    tilemap : [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]],
    objects_at_tile(tx, ty) {
        var out = [];
        for (var _i = 0; _i < this.objects.length; _i++) {
            if ((this.objects[_i].tilex === tx) && (this.objects[_i].tiley === ty)) {
                out.push(this.objects[_i])
            }
        }
        return out;
    },
    update(_inputs){
        this.objects.forEach((obj) => obj.update(_inputs, this));
    },
    draw(_ctx){
        // background
        _ctx.drawImage(this.img_bg, 0, 0);
        // tilemap
        if (this.img_ts.loaded) {
            for (var tx = 1; tx<16; tx++) {
                for (var ty = 1; ty < 9; ty++) {
                    this.img_ts.draw(_ctx, tx*16 - 8, ty*16 - 8, this.tilemap[tx][ty]);
                }
            }
        }
        // objects
        this.objects.forEach((obj) => obj.draw(_ctx));
        // frame
        _ctx.drawImage(this.img_fg, 0, 0);
    }
};

room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";


export default room;