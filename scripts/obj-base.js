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

export default Obj;