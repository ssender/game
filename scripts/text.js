const img_text = new Image();
img_text.src = "images/text.png";
const promises = new Array(96);
img_text.onload = () => {
    for (var ty = 0; ty < 6; ty++) {
        for (var tx=0; tx < 16; tx++) {
            promises[ty*16 + tx] = createImageBitmap(img_text, tx*8, ty*12, 8, 12);
        }
    }
    const sprites = Promise.all(promises)
}

export default await sprites;
