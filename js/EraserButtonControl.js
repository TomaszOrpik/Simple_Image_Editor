
function InitEraser() { /// set color to white
    if (window._eraserActive) {
        if (window._drawing) { ResetCanvas('EraserButton');  };
        var button = 'EraserButton';
        var color = '#FFFFFF';
        ColorButtonClick(color, button);
        ResetBorder('ColWhite');
        document.getElementById(button).focus();
        window._eraserActive = false;
    }
    else {
        document.getElementById('textBox').style.visibility = 'hidden'; 
        document.getElementById('textSettings').style.display = 'none';

        ResetCanvas('EraserButton');
        document.getElementById('EraserButton').blur();
        window._eraserActive = true;
    }
}