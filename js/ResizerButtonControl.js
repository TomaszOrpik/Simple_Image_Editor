
function ResizerClick() {
    if(window._resizeActive) { ///block infinitive resizing
        window.alert('Image already resized!');

    } else {
        _canvas = document.getElementById('canvasPool');
        _resCanvas = _canvas;
        _resCtx = _resCanvas.getContext('2d');
        var height = _canvas.height * 0.75;
        var width = _canvas.width * 0.75;
        _canvas.style.height = height + 'px';
        _canvas.style.width = width+ 'px';
        _canvas.height = height;
        _canvas.width = width;
        window._imageData = _canvas.toDataURL('image/jpg');
        _resCtx.scale(0.75, 0.75);
        _imageMirror.src = _imageData;
        window._ctx.drawImage(_imageMirror, 0, 0);
        window._resizeActive = true;
    }
}