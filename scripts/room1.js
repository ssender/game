import ObjCharacter from "./obj-character.js";
import ObjItem from "./obj-item.js";

const room = {
    img_bg : new Image(),
    img_fg : new Image(),
    objects : [new ObjCharacter(8, 8), new ObjItem(8, 40)],
    img_ts : new Image(),
    tilemap : [[32,32,32,32,32,32,32,32,32,32],[32,0,0,0,16,16,16,0,0,32],[32,0,0,0,0,16,16,16,0,32],[32,0,0,0,0,0,16,0,0,32],[32,0,0,48,56,0,0,0,0,32],[32,0,48,56,0,0,0,32,0,32],[32,48,56,48,56,0,0,0,0,32],[32,0,48,56,0,0,0,0,0,32],[32,48,56,0,8,0,0,32,0,32],[32,0,0,0,8,8,8,0,0,32],[32,48,56,0,0,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,48,56,48,56,0,8,0,0,32],[32,0,48,56,0,0,8,0,0,32],[32,0,0,48,56,0,8,0,0,32],[32,0,0,0,0,0,0,0,0,32],[32,32,32,32,32,32,32,32,32,32]],
    objects_at_tile(tx, ty) {
        var out = [];
        for (var _i = 0; _i < this.objects.length; _i++) {
            if ((this.objects[_i].tilex === tx) && (this.objects[_i].tiley === ty)) {
                out.push(this.objects[_i])
            }
        }
        return out;
    }
};

room.img_bg.src = "images/header-smaller.png";
room.img_fg.src = "images/frame.png";
room.img_ts = "images/ts1.png";

export default room;