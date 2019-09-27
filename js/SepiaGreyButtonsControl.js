
function ConvertToGrey() {
    
    var image = document.getElementById('mirror');
    var url = _canvas.toDataURL();
    var height = _canvas.height;
    var width = _canvas.width;
    image.src = url;
    var ctx = _canvas.getContext('2d');
    var imgPixels = ctx.getImageData(0, 0, width, height);
    
    for(var y = 0; y < height; y++){ ///convert pixels to grayScale
        for(var x = 0; x < width; x++){
            var i = (y * 4) * width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
}

function ConvertToSepia() {
    
    var image = document.getElementById('mirror');
    var url = _canvas.toDataURL();
    var height = _canvas.height;
    var width = _canvas.width;
    image.src = url;
    var ctx = _canvas.getContext('2d');
    var imgPixels = ctx.getImageData(0, 0, width, height);
    
    for(var y = 0; y < height; y++){ ///convert pixels to Sepia
        for(var x = 0; x < width; x++){
            var i = (y * 4) * width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            
            imgPixels.data[i] = avg+100;
            imgPixels.data[i + 1] = avg+50;
            imgPixels.data[i + 2] = avg;
        }
    }
    
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
}

