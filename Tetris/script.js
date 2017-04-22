
const SQUARE_SIZE_SIZE_PX = 15;

function Init()
{
	var canvas = document.getElementById('Screen');

	// document.addEventListener("keyup", keyUpHandler, false);

	if (canvas.getContext) {

	    var ctx = canvas.getContext('2d');

	    ConstructField();

	    // PrintField();

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
		
		for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
		{
			for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
			{
				if(FIELD[PosY + i][PosX + j] == 0)
					FIELD[PosY + i][PosX + j] = ActiveFigure.FigureMatrix[i][j];
			}
		}

	    DrawField();

		var UPDATE = false;

		setInterval(function () {

			if(RightKeyPressed == true)
			{
			    // Moving right
			    
				// Does the moved figure stay within the field?
                if(PosX + ActiveFigure.FigureMatrix[0].length < FIELD_WIDTH) {
                
					var MoveAllowed = true;
					LOOP:
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							// Does the moved figure overlap with other figures?
							if(FIELD[PosY + i][PosX + j + 1] != 0
								&& (j + 1 >= ActiveFigure.FigureMatrix[0].length
								|| ActiveFigure.FigureMatrix[i][j + 1] == 0))
							{
								MoveAllowed = false;
								break LOOP;
							}
						}
					}
			    
			    	if (MoveAllowed)
			    	{
						RemoveFigureFromField(ActiveFigure.FigureMatrix, PosY, PosX);
						
						PosX++;
						
						AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
					}
				}
			}
			else if(LeftKeyPressed)
			{
			    // Moving left
			    
				// Does the moved figure stay within the field?
                if(PosX > 0) {
                
					var MoveAllowed = true;
					LOOP:
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							// Does the moved figure overlap with other figures?
							if(FIELD[PosY + i][PosX + j - 1] != 0
								&& (j - 1 < 0
								|| ActiveFigure.FigureMatrix[i][j - 1] == 0))
							{
								MoveAllowed = false;
								break LOOP;
							}
						}
					}
					
			    	if (MoveAllowed)
			    	{
						RemoveFigureFromField(ActiveFigure.FigureMatrix, PosY, PosX);
						
						PosX--;
						
						AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
					}
	    		}
			}
			else if(DownKeyPressed)
			{
			    // Moving down
			    
				// Does the moved figure stay within the field?
                if(PosY + ActiveFigure.FigureMatrix.length < FIELD_HEIGHT)
                {
                
					var MoveAllowed = true;
					LOOP:
					for(var i = 0; i < ActiveFigure.FigureMatrix.length; i++)
					{
						for(var j = 0; j < ActiveFigure.FigureMatrix[i].length; j++)
						{
							// Does the moved figure overlap with other figures?
							if(FIELD[PosY + i + 1][PosX + j] != 0
								&& (i + 1 >= ActiveFigure.FigureMatrix.length
								|| ActiveFigure.FigureMatrix[i + 1][j] == 0))
							{
								MoveAllowed = false;
								break LOOP;
							}
						}
					}
					
			    	if (MoveAllowed)
			    	{
						RemoveFigureFromField(ActiveFigure.FigureMatrix, PosY, PosX);
						
						PosY++;
						
						AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
					}
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
                
				// Does the moved figure stay within the field?
                if(PosY + RotatedFigureMatrix.length <= FIELD.length
                	&& PosX + RotatedFigureMatrix[0].length <= FIELD[0].length) {
                	
					var RotationAllowed = true;
					LOOP:
					for(var i = 0; i < RotatedFigureMatrix.length; i++)
					{
						for(var j = 0; j < RotatedFigureMatrix[i].length; j++)
						{
							// Does the rotated figure overlap with other figures?
							if(FIELD[PosY + i][PosX + j] != 0
								&& (i >= ActiveFigure.FigureMatrix.length
								|| j >= ActiveFigure.FigureMatrix[0].length
								|| ActiveFigure.FigureMatrix[i][j] == 0))
							{
								RotationAllowed = false;
								break LOOP;
							}
						}
					}
					
					if(RotationAllowed)
					{
						RemoveFigureFromField(ActiveFigure.FigureMatrix, PosY, PosX);
						
						ActiveFigure.FigureMatrix = RotatedFigureMatrix;
						
						AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
					}
	    		}
	    		
	    		// Only rotate once per key press
	    		UpKeyPressed = false;
			}

			DrawField();

		}, 75);

		setInterval(function () {

			if(PosY + ActiveFigure.FigureMatrix.length < FIELD.length)
			{
				LOOP:
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
							break LOOP;
						}
					}
				}
			}
			else
			{
				UPDATE = true;
			}
			
			if(UPDATE == false)
			{
				RemoveFigureFromField(ActiveFigure.FigureMatrix, PosY, PosX);
				
				PosY++;
				
				AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
			}
			else
			{
				PosY         = 0;
				PosX         = Math.floor(Math.random() * 4 + 2);
				ActiveFigure = new Figure(Math.floor(Math.random() * 7 + 1));
				UPDATE       = false;
				
				AddFigureToField(ActiveFigure.FigureMatrix, PosY, PosX);
			}

			DrawField();

		}, 200);
	}
}

function RemoveFigureFromField(FigureMatrix, PosY, PosX)
{
	for(var i = 0; i < FigureMatrix.length; i++)
	{
		for(var j = 0; j < FigureMatrix[i].length; j++)
		{
			if(FigureMatrix[i][j] != 0)
				FIELD[PosY + i][PosX + j] = 0;
		}
	}
}

function AddFigureToField(FigureMatrix, PosY, PosX)
{
	for(var i = 0; i < FigureMatrix.length; i++)
	{
		for(var j = 0; j < FigureMatrix[i].length; j++)
		{
			if(FigureMatrix[i][j] != 0)
				FIELD[PosY + i][PosX + j] = FigureMatrix[i][j];
		}
	}
}

window.onload = function () {
	Init();
}