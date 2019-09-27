
function UndoDraw() {
    ///clone canvas
    var canvasClone = _canvas.cloneNode(true);
    _canvas.style.width = canvasClone.width+'px';
    _canvas.style.height = canvasClone.height+'px';
    _canvas.parentNode.replaceChild(canvasClone, _canvas);
    _canvas = canvasClone;
    ///check if canvas size didn't change
    if(_canvas.width != window._canvasUndoWidth || _canvas.height != window._canvasUndoHeight) {
        window._canvas.width = window._canvasUndoWidth;
        window._canvas.height = window._canvasUndoHeight;
        window._canvas.style.width = window._canvasUndoWidth+'px';
        window._canvas.style.height = window._canvasUndoHeight+'px';
        window._resizeActive = false;
    }
    ///draw last ctx from Array
    window._ctx = _canvas.getContext('2d');
    var ctxClone = _ArrayCtx[_ArrayCtx.length-1];
    if (!_ArrayCtx === undefined || !_ArrayCtx.length == 0){ ///check if array isn't empty
        _ctx.putImageData(ctxClone, 0, 0);
        _ArrayCtx.pop(_ArrayCtx.length-1);
    }

}