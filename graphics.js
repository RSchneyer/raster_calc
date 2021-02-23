// From: http://www.nixtu.info/2010/08/html5-canvas-gradients-triangle.html
function process(canvas, func) {
    function setPixel(imageData, x, y, rgba) {
        var index = (x + y * imageData.width) * 4;

        for (var i = 0; i < 4; i++) {
            imageData.data[index + i] = rgba[i]; // Removed mult by 255
        }
    }

    var ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width,
        canvas.height);

    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            var result = func(new Point(x, y));

            setPixel(imageData, x, y, result);
        }
    }

    ctx.putImageData(imageData, 0, 0);
}