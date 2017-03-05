
var RightKeyPressed = false;
var LeftKeyPressed = false;

function KeyDownHandler(event)
{
	if(event.keyCode == 39) {
        RightKeyPressed = true;
    }
    else if(event.keyCode == 37) {
        LeftKeyPressed = true;
    }
}

function KeyUpHandler(event) {
    if(event.keyCode == 39) {
        RightKeyPressed = false;
    }
    else if(event.keyCode == 37) {
        LeftKeyPressed = false;
    }
}

function MoveLeft()
{
	console.log('Pressed');
}