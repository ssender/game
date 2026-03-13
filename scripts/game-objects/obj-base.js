// base class for all in-game objects

class ObjBase {
    x = 0;
    y = 0;
    spritesheet = undefined;
    frame = 0;
    constructor(ix=0, iy=0) {
        this.x = ix;
        this.y = iy;
    }

    update() {
        this.spritesheet.update(frame);
    }
    
    draw(context) {
        this.spritesheet.draw(context, this.x, this.y);
    }
}

export default ObjBase;