import * as Obj from "scripts/game-objects/obj-base.js";
import * as Spr from "scripts/game-utils/sprsheet-base.js";

class ObjCharacter extends Obj {
    constructor(ix=0, iy=0) {
        super(ix=0, iy=0);
        this.spritesheet = new Spr("images/mc_spritesheet.png", 4, 5);
    }

    update() {
        super.update();
    }

    draw() {
        super.draw();
    }
}

export default ObjCharacter;