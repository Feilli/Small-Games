
var RightKeyPressed = false;
var LeftKeyPressed = false;
var DownKeyPressed = false;

function KeyDownHandler(event)
{
	if(event.keyCode == 39) {
        RightKeyPressed = true;
    }
    else if(event.keyCode == 37) {
        LeftKeyPressed = true;
    }
    else if(event.keyCode == 40) {
        DownKeyPressed = true;
    }
}

function KeyUpHandler(event) {
    if(event.keyCode == 39) {
        RightKeyPressed = false;
    }
    else if(event.keyCode == 37) {
        LeftKeyPressed = false;
    }
    else if(event.keyCode == 40) {
        DownKeyPressed = false;
    }
}

function MoveLeft()
{
	console.log('Pressed');
}