///define global variables

var _canvas;
var _ctx;
var _CanvasOriginalWidth;
var _CanvasOriginalHeight;

var _penActive;
var _eraserActive;
var _stampsActive;
var _textActive;
var _resizeActive;

///for drawing
var _colorsArray;
///boolean for track mouse events
var _drawing;

///for stamps
var _choosenImage;
var _canvasLeft;
var _canvasTop;
var _stampWidthHeight;
var _numberOfImages;

///for adding text
var _TextContext;
var _TextCanvas;
var _TextData;

var _xPos;
var _yPos;

///for resizer
var _imageMirror;
var _imageData;
var _resCanvas;
var _resCtx;


///for undo
var _ctxClone;
var _canvasUndoWidth;
var _canvasUndoHeight;

var _ArrayCtx = [];
///boolean for track mouse events
var _drawing;
///bool to track stickers generator
var _imgGenerated;

function Init() {
    ///define canvas and context
    _canvas = document.getElementById('canvasPool');
    _canvas.width = _canvas.offsetWidth;
    _canvas.height = _canvas.offsetHeight;

    _penActive = false;
    _eraserActive = false;
    _stampsActive = false;
    _textActive = false;
    _resizeActive = false;

    ///define start point of Canvas
    _canvasLeft = document.getElementById('drawPool').offsetLeft;
    _canvasTop = document.getElementById('drawPool').offsetTop;

    ///undo
    _canvasUndoWidth = _canvas.width;
    _canvasUndoHeight = _canvas.height;

    _ctx = _canvas.getContext('2d');

    document.addEventListener('resize', resize(), false);

    _colorsArray = ['StrokeInput', 'ColBlack', 'ColGreen', 'ColRed', 'ColBlue', 'ColYellow', 'ColPurple', 'ColPink', 'ColBrown'];

    _imgGenerated = false;

    ///stamps
    _stampWidthHeight = 150;
    _numberOfImages = 45;
    CreateStampDivs();

    document.getElementById('PenButton').addEventListener('click', InitPenButton, false);
    document.getElementById('TextButton').addEventListener('click', InitTextButton, false);
    document.getElementById('StampButton').addEventListener('click', InitStampButton, false);
    document.getElementById('UndoButton').addEventListener('click', UndoDraw, false);
    document.getElementById('EraserButton').addEventListener('click', InitEraser, false);
    ///grey and Sepia
    document.getElementById("GrayButton").addEventListener('click', ConvertToGrey, false);
    document.getElementById("SepiaButton").addEventListener('click', ConvertToSepia, false);

    document.getElementById('sizeInput').addEventListener('input', InputChange, false);

    InitTextResizer();
    TextDrag();
    DrawTextOnTextBox();

    document.getElementById('buttonText').addEventListener('click', drawTextOnCanvas, false);

    document.getElementById('ResizeButton').addEventListener('click', ResizerClick, false);

    ImageLoader.addEventListener('change', handleImage, false);

    document.getElementById('Reset').addEventListener('click', Clear, false);
    
    _imageMirror = document.getElementById('mirror');

    document.getElementById('ImageSave').addEventListener('click', Save, false);

    document.getElementById('About').addEventListener('click', About, false);
}

function resize() { 
    ///check div (center) offset than scale canvas to this numbers
    var height = 
    document.getElementById('drawPool').offsetHeight;
    var ratio = 
    _canvas.width/_canvas.height;
    var width = height * ratio;

    _canvas.width = width;
    _canvas.height = height;
    _canvas.style.width = width+'px';
    _canvas.style.height = height+'px';

}

///clear canvas from draw events
function ResetCanvas(button = 'PenButton') {

    ///function block for active stamps
    document.getElementById('stampsLayer').style.display = 'none';
    
    if (window._stampsActive) { ///stampsButtonCheck
        document.getElementById('canvasPool').removeEventListener('click', DrawStample);
        window._stampsActive = false;
    }

    var canvasDiv = document.getElementById('canvasPool');
    ctxClone = _ctx.getImageData(0, 0, canvasDiv.offsetWidth, canvasDiv.offsetHeight); //creates copy of context

    _ArrayCtx.push(ctxClone);

    var canvasClone = _canvas.cloneNode(true); //creates copy of canvas
    _canvas.parentNode.replaceChild(canvasClone, _canvas); //replace canvas with clone, and back
    _canvas = canvasClone;
    _ctx = _canvas.getContext('2d');
    _ctx.putImageData(ctxClone, 0, 0); //puts copy of context into new context

    document.getElementById(button).removeEventListener('onFocus', ChangePenIcon, false);
    window._drawing = false;
}