// From: http://www.nixtu.info/2010/08/html5-canvas-gradients-triangle.html
function process(canvas, func, pObj) {
    function setPixel(imageData, x, y, rgba) {
        var index = (x + y * imageData.width) * 4;

        for (var i = 0; i < 4; i++) {
            imageData.data[index + i] = rgba[i]; // Removed mult by 255
        }
    }

    var ctx = canvas.getContext("2d");
    console.log("Translating and scaling");
    // This doesn't work to flip coords, for some reason
    // ctx.translate(0, 1000);
    // ctx.scale(1,-1);
    var imageData = ctx.createImageData(canvas.width,
        canvas.height);
;

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            var result = func(new Point(x, y));
            var coords = cartToScreen(x,y);
            setPixel(imageData, coords[0],coords[1], result);
        }
    }
    setPixel(imageData, pObj.coords[0], pObj.coords[1], [255,255,255,255]);
    ctx.putImageData(imageData, 0, 0);
}

function cartToScreen(px, py) {
    return [px, -py + 1000];
  };