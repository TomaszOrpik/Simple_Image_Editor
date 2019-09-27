
function InitTextButton() {
    if(window._textActive) {
        document.getElementById('textBox').style.visibility = 'hidden'; 
        document.getElementById('textSettings').style.display = 'none';
        document.getElementById('TextButton').blur();
        window._textActive = false;
    } else {
        ResetCanvas();
        ShowHideButtons('hidden');
        document.getElementById('textBox').style.visibility = 'visible'; 
        document.getElementById('textSettings').style.display = 'block';
        document.getElementById('TextButton').focus();
        window._textActive = true;
    }
}

function drawTextOnCanvas() { ///move textbox position to canvas

    var xPos = _xPos;
    var yPos = _yPos+((_TextCanvas.offsetHeight/4)*3);

    var textImg = document.getElementById('textImg');
    textImg.src = window._TextData;
    window._ctx.drawImage(textImg, xPos, yPos);
    document.getElementById('TextButton').focus();
}

function DrawTextOnTextBox() { ///draw text on canvas
    var canvasTxt = document.getElementById('textCanvas');
    var ctxTxt = canvasTxt.getContext('2d');
    window._TextContext = ctxTxt;
    window._TextCanvas = canvasTxt;
    var txtColor = document.getElementById('txtColor').value;
    var txtSize = document.getElementById('txtSize').value;
    var txtFont = document.getElementById('txtFont').value;
    var text = document.getElementById('textInput').value;

    ctxTxt.clearRect(0, 0, canvasTxt.width, canvasTxt.height);

    ctxTxt.fillStyle = txtColor;
    ctxTxt.font = txtSize +' '+ txtFont;
    ctxTxt.fillText(text, 10, canvasTxt.height-30);

    window._TextData = canvasTxt.toDataURL();
}

function InitTextResizer() { ///creates div to manually resize textBox
    var textBox = document.getElementById('textBox');
    var container = document.getElementById('drawPool');
    var resizer = document.createElement('div');

    resizer.className='resizer';
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'darkgrey';
    resizer.style.borderRadius = '50%';
    resizer.style.cssFloat = 'right';
    resizer.style.position = 'absolute';
    resizer.style.right = 0;
    resizer.style.bottom = 0;
    resizer.style.cursor = 'se-resize';
    textBox.appendChild(resizer);

    resizer.addEventListener('mousedown',initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
        document.getElementById('TextButton').focus();
    }
    function Resize(e) {
        textBox.style.width = (e.clientX - textBox.offsetLeft - container.offsetLeft)+'px';
        textBox.style.height = (e.clientY - textBox.offsetTop - container.offsetTop)+'px';
        document.getElementById('TextButton').focus();
    }
    function stopResize(e) {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

}

function TextDrag() {  ///creates container with text, to manually choose position
    var container = document.getElementById('drawPool');
    var textBox = document.getElementById('textBox');
    var textSettings = document.getElementById('textSettings');
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener('mousedown', dragStart, false);
    container.addEventListener('mouseup', dragEnd, false);
    container.addEventListener('mousemove', drag, false);

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === textBox) {
            active = true;
            textSettings.style.visibility = 'hidden';
        }
    }
    function dragEnd(e) {
        initialX = currentX;
        initialY - currentY;

        active = false;
        textSettings.style.visibility = 'visible';
    }
    function drag(e) {
        if(active) {
            e.preventDefault();
            if(e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, textBox);
            document.getElementById('TextButton').focus();
        }
    }
    function setTranslate(xPos, yPos, el) {
        el.style.transform = 'translate3D('+ xPos + 'px, ' + yPos + 'px, 0)';
        window._xPos = xPos;
        window._yPos = yPos;
    }
}