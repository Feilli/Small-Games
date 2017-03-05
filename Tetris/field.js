
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

var FIELD = [];

var FIGURE_COLORS = [
	'#a800a8',
	'#a80000',
	'#a85400',
	'#00a800',
	'#00a8a8',
	'#0000a8',
	'#a8a8a8'
];

function ConstructField()
{
	FIELD[FIELD_HEIGHT] = [];

	for(var i = 0; i < FIELD_HEIGHT; i++)
	{
		FIELD[i] = [];

		for(var j = 0; j < FIELD_WIDTH; j++)
			FIELD[i][j] = 0;
	}
}

function PrintField()
{
	for(var i = 0; i < FIELD.length; i++) 
	{
		var str = "";

		for(var j = 0; j < FIELD[i].length; j++)
		{
			str = str + FIELD[i][j] + " ";
		}

		console.log(str);
	}
}

function DrawField()
{
	var canvas = document.getElementById('Screen');

	if (canvas.getContext) {

	    var ctx = canvas.getContext('2d');

	    var x = Math.floor(canvas.width / 3);
	    var y = 0;

	    for(var i = 0; i < FIELD_HEIGHT; i++)
	    {
	    	// Left border

	    	ctx.font = "bold 16px Lucida Console";
			ctx.fillStyle = "#5454fc";
			ctx.fillText('*', x + 2, y + 16);

			x += SQUARE_SIZE_SIZE_PX;

	    	for(var j = 0; j < FIELD_WIDTH; j++)
	    	{
	    		if(FIELD[i][j] != 0 && FIELD[i][j] != null)
	    		{
	    			ctx.beginPath();
					ctx.rect(x, y, SQUARE_SIZE_SIZE_PX, SQUARE_SIZE_SIZE_PX);
					ctx.fillStyle = FIGURE_COLORS[FIELD[i][j] - 1];
					ctx.fill();
	    		}
	    		else
	    		{
	    			ctx.beginPath();
					ctx.rect(x, y, SQUARE_SIZE_SIZE_PX, SQUARE_SIZE_SIZE_PX);
					ctx.fillStyle = "#000000";
					ctx.fill();

					ctx.font = "bold 16px Lucida Console";
					ctx.fillStyle = "#5454fc";
					ctx.fillText('.', x + 3, y + 8);
				}

				x += SQUARE_SIZE_SIZE_PX;
	    	}

	    	// Right border

	    	ctx.font = "bold 16px Lucida Console";
			ctx.fillStyle = "#5454fc";
			ctx.fillText('*', x + 2, y + 16);

	    	x = Math.floor(canvas.width / 3);
	    	y += SQUARE_SIZE_SIZE_PX;
	    }

	    // Bottom border

	    for(var j = 0; j < FIELD_WIDTH + 2; j++)
    	{
    		ctx.font = "bold 16px Lucida Console";
			ctx.fillStyle = "#5454fc";
			ctx.fillText('*', x + 2, y + 16);

			x += SQUARE_SIZE_SIZE_PX;
    	}

	}
}

class Figure {

	constructor(FigureID)
	{
		this.Active = true;

		switch(FigureID)
		{
			case 1 :

				this.FigureMatrix = [
					[1, 1, 1],
					[1, 0, 0]
				];

			break;

			case 2 :

				this.FigureMatrix = [
					[2, 2, 2, 2]
				];

			break;

			case 3 :

				this.FigureMatrix = [
					[3, 3, 3],
					[0, 3, 0]
				];

			break;

			case 4 :

				this.FigureMatrix = [
					[0, 4, 4],
					[4, 4, 0]
				];

			break;

			case 5 :

				this.FigureMatrix = [
					[5, 5, 0],
					[0, 5, 5]
				];

			break;

			case 6 :

				this.FigureMatrix = [
					[6, 6],
					[6, 6]
				];

			break;

			case 7 :

				this.FigureMatrix = [
					[7, 7, 7],
					[0, 0, 7]
				];

			break;
		}
	}
}