
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

		var ActiveFigure = new Figure(Math.floor(Math.random() * 7 + 1));

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
			    // Moving right
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
			    // Moving left
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
			    // Moving down
				if(FIELD[PosY - 1 + ActiveFigure.FigureMatrix.length][PosX] == 0)
				{
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							if(ActiveFigure.FigureMatrix[i][j] != 0)
								FIELD[PosY - 1 + i][PosX + j] = 0;
						}
					}

					if(PosY - 1 + ActiveFigure.FigureMatrix.length < FIELD_HEIGHT)
	    				PosY++;
	    		}
			}
			else if(UpKeyPressed)
			{
			    // Rotating clockwise
			    
			    var RotatedFigureMatrix = ActiveFigure.FigureMatrix[0].map(function(col, i)
			    {
                	return ActiveFigure.FigureMatrix.map(function(row, j)
                	{
						return ActiveFigure.FigureMatrix[ActiveFigure.FigureMatrix.length - j - 1][i];
					})
                });
                
                if(PosY - 1 + RotatedFigureMatrix.length <= FIELD.length
                	&& PosX + RotatedFigureMatrix[0].length <= FIELD[0].length) {
					var RotationAllowed = true;
					LOOP:
					for(var i = 0; i < RotatedFigureMatrix.length; i++)
					{
						for(var j = 0; j < RotatedFigureMatrix[i].length; j++)
						{
							// Does the rotated figure overlap with over figures?
							if(FIELD[PosY - 1 + i][PosX + j] != 0
								&& (i >= ActiveFigure.FigureMatrix.length
								|| j >= ActiveFigure.FigureMatrix[0].length
								|| ActiveFigure.FigureMatrix[i][j] == 0))
							{
								RotationAllowed = false;
								debugger;
								break LOOP;
							}
						}
					}
					
					if(RotationAllowed)
					{
						for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
						{
							for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
							{
								if(ActiveFigure.FigureMatrix[i][j] != 0)
									FIELD[PosY - 1 + i][PosX + j] = 0;
							}
						}
						
						ActiveFigure.FigureMatrix = RotatedFigureMatrix;
					}
	    		}
	    		
	    		// Only rotate once per key press
	    		UpKeyPressed = false;
			}

		}, 75);

		setInterval(function () {

			if(PosY + ActiveFigure.FigureMatrix.length < FIELD.length && UPDATE == false)
			{
				for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
				{
					for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
					{
						if(FIELD[PosY + i + 1][PosX + j] != 0
							&& ActiveFigure.FigureMatrix[i][j] != 0
							&& (i + 1 >= ActiveFigure.FigureMatrix.length
							|| ActiveFigure.FigureMatrix[i + 1][j] == 0))
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
				ActiveFigure = new Figure(Math.floor(Math.random() * 7 + 1));
				UPDATE       = false;
			}

			DrawField();

		}, 200);
	}
}

window.onload = function () {
	Init();
}