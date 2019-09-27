
var ImageLoader = document.getElementById('ImageLoader');

function handleImage(e) { ///image loader
    var reader = new FileReader();

    reader.onload = function(event){
        var img = new Image();

        img.onload = function(){
            _CanvasOriginalHeight = _canvas.height;
            _CanvasOriginalWidth = _canvas.width;

            var maxWidth = document.getElementById('drawPool').clientWidth;
            var maxHeight = document.getElementById('drawPool').clientHeight;

            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / width;
                    height = maxHeight;
                }
            }

            _ctx.drawImage(img, 0, 0, width, height);     
            }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function Save() {
    var url = _canvas.toDataURL('jpg');
    
    var a = document.createElement('a');
    a.href = url;
    a.download = 'image/jpg';
    a.click();

    document.removeChild('a');
}

function About() {
    var ctx = _canvas.getContext('2d');
    var img = document.getElementById('aboutInfo');

    _CanvasOriginalHeight = _canvas.height;
    _CanvasOriginalWidth = _canvas.width;

    var maxWidth = document.getElementById('drawPool').clientWidth;
    var maxHeight = document.getElementById('drawPool').clientHeight;

    var width = img.width;
    var height = img.height;

    if (width > height) {
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width *= maxHeight / width;
            height = maxHeight;
        }
    }

    ctx.drawImage(img, 0, 0, width, height);
}

function Clear() {
    var ctx = _canvas.getContext('2d');
    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
}