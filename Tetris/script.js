
const SQUARE_SIZE_SIZE_PX = 15;

function Init()
{
	var canvas = document.getElementById('Screen');

	// document.addEventListener("keyup", keyUpHandler, false);

	if (canvas.getContext) {

	    var ctx = canvas.getContext('2d');

	    ConstructField();

	    // PrintField();

	    DrawField();

		var ActiveFigure = new Figure(Math.floor(Math.random() * 6 + 1));

		document.addEventListener("keydown", KeyDownHandler, false);
		document.addEventListener("keyup", KeyUpHandler, false);

		/*for(var i = 0; i < Test.FigureMatrix.length; i++)
		{
			for(var j = 0; j < Test.FigureMatrix[i].length; j++)
			{
				FIELD[i][j] = Test.FigureMatrix[i][j];
			}
		}*/

		var PosY = 0;
		var PosX = Math.floor(Math.random() * 4 + 2);

		var UPDATE = false;

		setInterval(function () {

			if(RightKeyPressed == true)
			{
				if(FIELD[PosY][PosX + ActiveFigure.FigureMatrix[0].length] == 0)
				{
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							if(ActiveFigure.FigureMatrix[i][j] != 0)
								FIELD[PosY - 1 + i][PosX + j] = 0;
						}
					}

					if(PosX + ActiveFigure.FigureMatrix[0].length < FIELD_WIDTH)
						PosX++;
				}
			} 
			else if(LeftKeyPressed)
			{
				if(FIELD[PosY][PosX - 1] == 0)
				{
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							if(ActiveFigure.FigureMatrix[i][j] != 0)
								FIELD[PosY - 1 + i][PosX + j] = 0;
						}
					}

					if(PosX > 0)
	    				PosX--;
	    		}
			} 
			else if(DownKeyPressed)
			{
				if(FIELD[PosY + ActiveFigure.FigureMatrix.length][PosX] == 0)
				{
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							if(ActiveFigure.FigureMatrix[i][j] != 0)
								FIELD[PosY - 1 + i][PosX + j] = 0;
						}
					}

					if(PosY + ActiveFigure.FigureMatrix.length < FIELD_HEIGHT)
	    				PosY++;
	    		}
			}

		}, 75);

		setInterval(function () {

			if(PosY + ActiveFigure.FigureMatrix.length < FIELD.length && UPDATE == false)
			{
				for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
				{
					for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
					{
						if(FIELD[PosY + i + 1][PosX + j] != 0 && ActiveFigure.FigureMatrix[i][j] != 0)
						{
							UPDATE = true;
						}
					}
				}

				if(PosY > 0)
				{
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							if(ActiveFigure.FigureMatrix[i][j] != 0)
								FIELD[PosY - 1 + i][PosX + j] = 0;
						}
					}
				}

				for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
				{
					for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
					{
						if(FIELD[PosY + i][PosX + j] == 0)
							FIELD[PosY + i][PosX + j] = ActiveFigure.FigureMatrix[i][j];
					}
				}

				PosY++;
			}
			else
			{
				PosY         = 0;
				PosX         = Math.floor(Math.random() * 4 + 2);
				ActiveFigure = new Figure(Math.floor(Math.random() * 6 + 1));
				UPDATE       = false;
			}

			DrawField();

		}, 200);
	}
}

window.onload = function () {
	Init();
}