var crosser = function(Point_1_X,Point_1_Y,Point_2_X,Point_2_Y,Point_3_X,Point_3_Y,Point_4_X,Point_4_Y){
	var res = (((Point_3_X-Point_1_X)*(Point_2_Y-Point_1_Y) - (Point_3_Y-Point_1_Y)*(Point_2_X-Point_1_X)) * 
             ((Point_4_X-Point_1_X)*(Point_2_Y-Point_1_Y) - (Point_4_Y-Point_1_Y)*(Point_2_X-Point_1_X)) <= 0) 
            && 
            (((Point_1_X-Point_3_X)*(Point_4_Y-Point_3_Y) - (Point_1_Y-Point_3_Y)*(Point_4_X-Point_3_X)) * 
             ((Point_2_X-Point_3_X)*(Point_4_Y-Point_3_Y) - (Point_2_Y-Point_3_Y)*(Point_4_X-Point_3_X)) <= 0) 
	
	return res;
	}

var field = document.getElementById("field");
var size = 20;

var block = [];
var currentElement = "";
var playerX = 1;
var playerY = 1;
var curPositionClass = "f-block " + "start";
var noMoreMoves = false;
var movesCounter = 0;
var startPositionX = 1;
var startPositionY = 1;

var finishPositionX = size-2;
var finishPositionY = size-2;

var isCustomLab = false;

var vision = 4;

var vb2 = document.getElementById("vision2");
var vb3 = document.getElementById("vision3");
var vb4 = document.getElementById("vision4");
var coddLoadd = document.getElementById("codd-load");
var score = document.getElementById("score");

var visionSet = function(){
	if(this.id === "vision2") vision = 2;
	if(this.id === "vision3") vision = 3;
	if(this.id === "vision4") vision = 4;
}

vb2.onclick = visionSet;
vb3.onclick = visionSet;
vb4.onclick = visionSet;

//map generation
var f = function(){
	noMoreMoves = false;
	field.innerHTML = "";
	if(this.id ==="size20")
	{
		size = 20;
		isCustomLab = false;
	}
	if(this.id ==="size30")
	{
		size = 30;
		isCustomLab = false;
	}
	if(this.id ==="size40")
	{
		size = 40;
		isCustomLab = false;
	}
	if(this.id === "codd-load")
	{
		isCustomLab = true;
		var fieldSaved = [];
		var fieldStr = document.getElementById("codd").value;
		var filedDvd = fieldStr.split(' ');
		size = Math.sqrt(filedDvd.length);
		for(let i=0; i<size; i++)
			{
				fieldSaved[i] = [];
				for(let j=0; j<size; j++)
				{
					fieldSaved[i][j] = "";
				}
			}
		


	}
	field.style.width = (size*20) + "px";
	//field buildder
	for(let i=0; i<size; i++)
	{
		block[i] = [];
		for(let j=0; j<size; j++)
		{
			block[i][j] = document.createElement("div");
			block[i][j].setAttribute('id','block-'+i+"-"+j);
	        block[i][j].setAttribute('class','f-block');
	        field.appendChild(block[i][j]);
		}
	}
	if(isCustomLab){
	var counter = 0;
		for(let i=0; i<size; i++)
			{
				for(let j=0; j<size; j++)
				{
					if(filedDvd[counter]==="0")block[i][j].className = "f-block ";
					if(filedDvd[counter]==="1")block[i][j].className = "f-block wall"
					if(filedDvd[counter]==="s"){
						block[i][j].className = "f-block start"
						playerX=i;
						playerY=j;
					}
					if(filedDvd[counter]==="f"){
						block[i][j].className = "f-block finish"
						finishPositionX = i;
						finishPositionY = j;
					}
					counter++;
				}
			}

		}
	else{
		playerX=1;
		playerY=1;
		finishPositionX = size-2;
		finishPositionY = size-2;

	}
	block[playerX][playerY].innerHTML = "O!";
	curPositionClass = "f-block " + "start";
	movesCounter = 0;
	score.innerHTML = "Score: " + movesCounter; 
	

	if(!isCustomLab){
		for(let i=0; i<size; i++)
	{
		for(let j=0; j<size; j++)
		{
			block[i][j].className = "f-block ";
			block[i][j].innerHTML = "";
			if(i===0||i===size-1) block[i][j].className = "f-block " + "wall";
			if(j===0||j===size-1) block[i][j].className = "f-block " + "wall";
		}
	}

	for(let i=0; i<size; i++)
	{
		for(let j=0; j<size; j++)
		{
			let variant = Math.floor(Math.random()*4+1);
			if(variant===1) block[i][j].className = "f-block " + "wall";
			if(i===0||i===size-1) block[i][j].className = "f-block " + "wall";
			if(j===0||j===size-1) block[i][j].className = "f-block " + "wall";
		}
	}
	block[startPositionX][startPositionY].className = "f-block " + "start" + " player";
	block[finishPositionX][finishPositionY].className = "f-block " + "finish";
	block[startPositionX][startPositionY].innerHTML = "O!";
	}
	else{



	}
	
	for(let i=0; i<size; i++)
	{
		for(let j=0; j<size; j++)
		{
			if(Math.floor(Math.sqrt((playerX-i)*(playerX-i)+(playerY-j)*(playerY-j))) < 2) 
			{
				if(block[i][j].className.includes(" darkness")){
					let str =  block[i][j].className;
					block[i][j].className=str.replace(" darkness","");
				}
			}
			else {
				if(!block[i][j].className.includes("darkness"))
				block[i][j].className+=" darkness";
			}
		}
	}
}
var mp20 = document.getElementById("size20");
var mp30 = document.getElementById("size30");
var mp40 = document.getElementById("size40");
mp20.onclick = f;
mp30.onclick = f;
mp40.onclick = f;
coddLoadd.onclick = f;
document.body.onkeydown = function(event){
	if(noMoreMoves) return;
	//right
	if(event.keyCode === 68){
		if(!block[playerX][playerY + 1].className.includes("wall")){
			block[playerX][playerY].className = curPositionClass;
			block[playerX][playerY].innerHTML = "";
			curPositionClass = block[playerX][playerY + 1].className;
			block[playerX][playerY + 1].innerHTML = "O!";
			block[playerX][playerY + 1].className += " player";
			playerY+=1;
		}
	}
	//down
	else if(event.keyCode === 83){
		if(!block[playerX + 1][playerY].className.includes("wall")){
			block[playerX][playerY].className = curPositionClass;
			block[playerX][playerY].innerHTML = "";
			curPositionClass = block[playerX + 1][playerY].className;
			block[playerX + 1][playerY].innerHTML = "O!";
			block[playerX + 1][playerY].className += " player";
			playerX+=1;
		}
	}
	//left
	else if(event.keyCode === 65){
		if(!block[playerX][playerY - 1].className.includes("wall")){
			block[playerX][playerY].className = curPositionClass;
			block[playerX][playerY].innerHTML = "";
			curPositionClass = block[playerX][playerY - 1].className;
			block[playerX][playerY - 1].innerHTML = "O!";
			block[playerX][playerY - 1].className += " player";
			playerY-=1;
		}
	}
	//up
	else if(event.keyCode === 87){
		if(!block[playerX - 1][playerY].className.includes("wall")){
			block[playerX][playerY].className = curPositionClass;
			block[playerX][playerY].innerHTML = "";
			curPositionClass = block[playerX - 1][playerY].className;
			block[playerX - 1][playerY].innerHTML = "O!";
			block[playerX - 1][playerY].className += " player";
			playerX-=1;
		}
	}
	else return;
	movesCounter++;
	for(let i=0; i<size; i++)
	{
		for(let j=0; j<size; j++)
		{
			if(Math.floor(Math.sqrt((playerX-i)*(playerX-i)+(playerY-j)*(playerY-j))) < vision) 
			{

				var playerX_coord = playerX*20+10;
				var playerY_coord = playerY*20+10;

				var isCrossing = false;

				var blockListX = [];
				var blockListY = [];
				var crossBlockListX = [];
				var crossBlockListY = [];
				
				var blokCount = 0;
				var crossBlockCount = 0;

				var ceepBright = false;
				
				if((i<=playerX)&&(j<=playerY)){
					for(let n = i; n <= playerX; n++){
						for(let k = j; k <= playerY; k++){
							blockListX[blokCount] = n;
							blockListY[blokCount] = k;
							blokCount++;
						}
					}
				}else if((i<=playerX)&&(j>=playerY)){
					for(let n = i; n <= playerX; n++){
						for(let k = playerY; k <= j; k++){
							blockListX[blokCount] = n;
							blockListY[blokCount] = k;
							blokCount++;
						}
					}
				}
				else if((i>=playerX)&&(j<=playerY)){
					for(let n = playerX; n <= i; n++){
						for(let k = j; k <= playerY; k++){
							blockListX[blokCount] = n;
							blockListY[blokCount] = k;
							blokCount++;
						}
					}
				}
				else if((i>=playerX)&&(j>=playerY)){
					for(let n = playerX; n <= i; n++){
						for(let k = playerY; k <= j; k++){
							blockListX[blokCount] = n;
							blockListY[blokCount] = k;
							blokCount++;
						}
					}
				}
				for(let k = 0; k < blokCount; k++)
				{
					if((i<=playerX)&&(j<=playerY)){
						if(crosser(playerX_coord,playerY_coord,(i)*20,(j)*20,blockListX[k]*20,blockListY[k]*20,(blockListX[k])*20+20,(blockListY[k])*20+20)||
							crosser(playerX_coord,playerY_coord,(i)*20,(j)*20,(blockListX[k])*20+20,blockListY[k]*20,blockListX[k]*20,(blockListY[k])*20+20)){
							crossBlockListX[crossBlockCount] = blockListX[k];
							crossBlockListY[crossBlockCount] = blockListY[k];
							crossBlockCount++;
						}
					}
					else if((i<=playerX)&&(j>=playerY)){
						if(crosser(playerX_coord,playerY_coord,(i)*20,(j)*20+20,blockListX[k]*20,blockListY[k]*20,(blockListX[k])*20+20,(blockListY[k])*20+20)||
							crosser(playerX_coord,playerY_coord,(i)*20,(j)*20+20,(blockListX[k])*20+20,blockListY[k]*20,blockListX[k]*20,(blockListY[k])*20+20)){
							crossBlockListX[crossBlockCount] = blockListX[k];
							crossBlockListY[crossBlockCount] = blockListY[k];
							crossBlockCount++;
						}
					}
					else if((i>=playerX)&&(j<=playerY)){
						if(crosser(playerX_coord,playerY_coord,(i)*20+20,(j)*20,blockListX[k]*20,blockListY[k]*20,(blockListX[k])*20+20,(blockListY[k])*20+20)||
							crosser(playerX_coord,playerY_coord,(i)*20+20,(j)*20,(blockListX[k])*20+20,blockListY[k]*20,blockListX[k]*20,(blockListY[k])*20+20)){
							crossBlockListX[crossBlockCount] = blockListX[k];
							crossBlockListY[crossBlockCount] = blockListY[k];
							crossBlockCount++;
						}
					}
					else if((i>=playerX)&&(j>=playerY)){
						if(crosser(playerX_coord,playerY_coord,(i)*20+20,(j)*20+20,blockListX[k]*20,blockListY[k]*20,(blockListX[k])*20+20,(blockListY[k])*20+20)||
							crosser(playerX_coord,playerY_coord,(i)*20+20,(j)*20+20,(blockListX[k])*20+20,blockListY[k]*20,blockListX[k]*20,(blockListY[k])*20+20)){
							crossBlockListX[crossBlockCount] = blockListX[k];
							crossBlockListY[crossBlockCount] = blockListY[k];
							crossBlockCount++;
						}
					}
				}
				for(let k = 0; k < crossBlockCount; k++)
				{
					if(
						block[crossBlockListX[k]][crossBlockListY[k]].className.includes(" wall")){
						ceepBright = true;
						break;
					}
				}

				if(!ceepBright){
					if(block[i][j].className.includes(" darkness")){
						let str =  block[i][j].className;
						block[i][j].className=str.replace(" darkness","");
					}
				}
				else if(!block[i][j].className.includes(" darkness")){
					block[i][j].className+=" darkness";
				}
				if(Math.floor(Math.sqrt((playerX-i)*(playerX-i)+(playerY-j)*(playerY-j))) <2){
					if(block[i][j].className.includes(" darkness")){
						let str =  block[i][j].className;
						block[i][j].className=str.replace(" darkness","");
					}
				} 
				// for(let k = 0; k < crossBlockCount; k++)
				// {
				// 	var crs2X = crossBlockListX.reverse();
				// 	var crs2Y = crossBlockListX.reverse();
				// 	if(block[crs2X[k]][crs2Y[k]].className.includes(" wall")){
				// 		if(block[crs2X[k]][crs2Y[k]].className.includes(" darkness")){
				// 			let str =  block[crs2X[k]][crs2Y[k]].className;
				// 			block[crs2X[k]][crs2Y[k]].className=str.replace(" darkness","");
				// 		}
				// 		break;
				// 	}
				// }

			}
			else {
				if(!block[i][j].className.includes("darkness"))
				block[i][j].className+=" darkness";
			}
		}
	}
	if(block[finishPositionX][finishPositionY].className === "f-block finish player") 
		{
			noMoreMoves = true;
			alert("YOU WON!");
			
			score.innerHTML = "Score: " + movesCounter; 
			for(let i=0; i<size; i++)
			{
				for(let j=0; j<size; j++)
				{
					if(block[i][j].className.includes(" darkness")){
						let str =  block[i][j].className;
						block[i][j].className=str.replace(" darkness","");
					}
				}
			}
		}
}