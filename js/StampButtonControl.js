
function InitStampButton() {
    if (window._stampsActive) {
        document.getElementById('stampsLayer').style.display = 'none';
        document.getElementById('StampButton').blur();
        document.getElementById('canvasPool').removeEventListener('click', DrawStample);
        window._stampsActive = false;
    }
    else {
        document.getElementById('textBox').style.visibility = 'hidden'; 
        document.getElementById('textSettings').style.display = 'none';

        ResetCanvas();
        ShowHideButtons('hidden');

        document.getElementById('stampsLayer').style.display = 'block';
        document.getElementById('StampButton').focus();
        document.getElementById('canvasPool').addEventListener('click', DrawStample, false);
        window._stampsActive = true;
    }
}

document.getElementById('stampBar').addEventListener('click', function GetTarget(e) { 
    _choosenImage = document.getElementById(e.target.id);
    document.getElementById('StampButton').focus();
    if(_choosenImage === document.getElementById('sizeDiv') || _choosenImage === document.getElementById('sizeInput')) {
        console.log('No input'); 
    }
    else {
        document.getElementById('stampsLayer').style.display = 'none';
    }
 });

function DrawStample(event) {
    _ctx.drawImage(_choosenImage, event.clientX - _canvasLeft - (_stampWidthHeight/2), event.clientY - _canvasTop - (_stampWidthHeight/2), _stampWidthHeight, _stampWidthHeight);
    document.getElementById('StampButton').focus();
}

function InputChange() { ///change size of stamps by input

    var scale = document.getElementById('sizeInput').value;
    if(_imgGenerated) {
        DeleteStampDivs();
    }
    _stampWidthHeight = 150*scale;
    document.getElementById('sizeDiv').style.height = Width_Height + 'px';
    document.getElementById('sizeDiv').style.width = Width_Height + 'px';
    document.getElementById('sizeInput').style.width = _stampWidthHeight+'px';
    document.getElementById('sizeInput').style.height = _stampWidthHeight+'px';
    document.getElementById('sizeInput').style.fontSize = _stampWidthHeight/3+'px';
    document.getElementById('StampButton').focus();

    CreateStampDivs(scale);
}

function CreateStampDivs(scale = 1) {
    
    Width_Height = _stampWidthHeight*scale;

    ///set containers size
    document.getElementById('topfiller').style.width = _canvas.width;
    document.getElementById('topfiller').style.height = _canvas.height - Width_Height - 4 + 'px';

    document.getElementById('stampBar').style.width = _canvas.width;
    document.getElementById('stampBar').style.height = Width_Height + 4 + 'px';

    document.getElementById('sizeDiv').style.height = Width_Height + 'px';
    document.getElementById('sizeDiv').style.width = Width_Height + 'px';

    for(var i=1;i<=_numberOfImages;i++) ///generated divs based of stickers number
    {
        var image = document.createElement('img');
        image.src = 'STICKERS/img'+i+'.png';
        image.id = 'img'+i;
        image.draggable = 'true';
        image.style.width = Width_Height+'px';
        image.style.height = Width_Height+'px'; 
        image.style.display = 'inline-block';
        image.style.verticalAlign = 'top';

        document.getElementById('stampBar').appendChild(image);  
    }
    _imgGenerated = true;
}

function DeleteStampDivs() {

    for(var i=1; i<=_numberOfImages;i++) {
        document.getElementById('img'+i).remove();
    }
    _imgGenerated = false;

}