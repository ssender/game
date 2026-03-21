class Spritesheet {
    nrows = 1;
    ncols = 1;
    img = new Image();
    nframes = 1;
    frameWidth = 1;
    frameHeight = 1;
    sheetx = 0; // stores the target coordinates between the update and draw steps.
    sheety = 0;
    loaded = false;

    draw(context, x, y, f) {
        if (this.loaded) {
            context.drawImage(bitmaps[f], x, y);
        }
    }

    constructor(_img, _nrows, _ncols, _imgwidth, _imgheight) {
        this.img.src = _img;
        this.nrows = _nrows;
        this.ncols = _ncols;
        this.bitmaps = new Array(_nrows * _ncols);
        this.nframes = _nrows * _ncols;
        this.frameWidth = _imgwidth / _nrows;
        this.frameHeight = _imgheight / _ncols;
        this.img.onload = () => {
            for (var ty = 0; ty < this.nrows; ty++) {
                for (var tx=0; tx < this.ncols; tx++) {
                    this.bitmaps[ty*this.ncols + tx] = createImageBitmap(img_text, tx*8, ty*this.frameHeight , 8, 12);
                }
            }
            Promise.all(this.bitmaps).then((maps) => {
                this.loaded = true;
            })
        };
    }
}

export default Spritesheet;