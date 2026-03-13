// base class for all spritesheets
// frames indexed from 0, must be equally sized, can have specified numbers of rows and columns. 

class Spritesheet {
    nrows = 1;
    ncols = 1;
    img = undefined;
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

    constructor(_img, _nrows, _ncols) {
        this.img = _img;
        this.nrows = _nrows;
        this.ncols = _ncols;
        this.nframes = _nrows * _ncols;
        this.frameWidth = _img.width / _nrows;
        this.frameHeight = _img.height / _ncols;
    }
}