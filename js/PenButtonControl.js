///initiaize Pen button
function InitPenButton() {
    if (window._penActive) {
        ChangePenIcon('#000000');
        document.getElementById('PenButton').blur();
        ShowHideButtons('hidden'); ///change color buttons style to hidden
        window._penActive = false;
        if (window._drawing) { ResetCanvas(); };
    } else {
        document.getElementById('textBox').style.visibility = 'hidden'; 
        document.getElementById('textSettings').style.display = 'none';

        ColorButtonClick('#000000');
        ResetBorder('ColBlack'); ///change border to ColBlack button
        ShowHideButtons('visible'); ///change color buttons style to visible
        window._penActive = true;
    }
}  

///initializing choose color buttons
function ClickBlack() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#696969';
    ColorButtonClick('#000000');
    ResetBorder('ColBlack');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickGreen() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#008000';
    ColorButtonClick(color);
    ResetBorder('ColGreen');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickRed() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#FF0000';
    ColorButtonClick(color);
    ResetBorder('ColRed');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickBlue() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#0000FF';
    ColorButtonClick(color);
    ResetBorder('ColBlue');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickYellow() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#FFFF00';
    ColorButtonClick(color);
    ResetBorder('ColYellow');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickPurple() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#800080';
    ColorButtonClick(color);
    ResetBorder('ColPurple');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickPink() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#FAAFBE';
    ColorButtonClick(color);
    ResetBorder('ColPink');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}
function ClickBrown() {
    if (window._drawing) { ResetCanvas(); };
    var button = 'PenButton';
    var color = '#A52A2A';
    ColorButtonClick(color, button);
    ResetBorder('ColBrown');
    document.getElementById(button).AddEventListener('onFocus', ChangePenIcon(color));
    document.getElementById(button).focus();
}

function ColorButtonClick(color, button = 'PenButton'){

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) { ///here init mouse position
        
        var xoffset = document.getElementById('canvasPool').offsetParent.offsetLeft; ///set Left corner of canvas
        var yoffset = document.getElementById('canvasPool').offsetParent.offsetTop; ///set top corner of canvas

        clickX.push(x-xoffset);
        clickY.push(y-yoffset);
        clickDrag.push(dragging);
    }
    function redraw() { ///draw on context mouse position
        _ctx = _canvas.getContext('2d');
        _ctx.strokeStyle = color;
        _ctx.lineJoin = 'round';
        _ctx.lineWidth = document.getElementById('StrokeInput').value;
        for(var i=0; i < clickX.length; i++) {		
            _ctx.beginPath();
            if(clickDrag[i] && i) {
              _ctx.moveTo(clickX[i-1], clickY[i-1]);
            } else {
               _ctx.moveTo(clickX[i]-1, clickY[i]);
             }
             _ctx.lineTo(clickX[i], clickY[i]);
             _ctx.closePath();
             _ctx.stroke();
            }
    }
    var engage = function(e) { ///start drawing

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
        if (button === 'PenButton') { ShowHideButtons('hidden'); };
        if (button === 'EraserButton') { _canvas.style.cursor = url('eraser.cur'), auto;};       
    }
    var putPoint = function(e) {
        document.getElementById(button).focus();

        if(paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
            if (button === 'PenButton') { ShowHideButtons('hidden'); };
            if (button === 'EraserButton') { _canvas.style.cursor = url('eraser.cur'), auto;};
        }
    }
    var disengage = function(e) { ///end drawinf
        paint = false;
        if (button === 'PenButton') { ShowHideButtons('visible'); };
    }
    var disengage_leave = function(e) {
        paint = false;
        if (button === 'PenButton') { ShowHideButtons('visible'); };
    }

    _canvas.addEventListener('mousedown', engage, true);
    _canvas.addEventListener('mousemove', putPoint, true);
    _canvas.addEventListener('mouseup', disengage, false);
    _canvas.addEventListener('mouseleave', disengage_leave, true);
    window._drawing = true;
}

///change colors button border
function ResetBorder(choosenButton) {
    for(var i=0; i < _colorsArray.length; i++) {
        if(_colorsArray[i]===choosenButton) {
            document.getElementById(choosenButton).style.borderColor='darkgrey';
        }
        document.getElementById(_colorsArray[i]).style.borderColor='lightgrey';
    }
}
///show and hide colors button
function ShowHideButtons(status) {
    for(var i=0; i < _colorsArray.length;i++) {
        document.getElementById(_colorsArray[i]).style.visibility=status;
    }
}
///change Pen Icon color
function ChangePenIcon(color) {
    document.getElementById('PenButton').style.color=color;
}