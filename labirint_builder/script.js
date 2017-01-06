var field = document.getElementById("field");
var size = 20;

var block = [];

var startPositionX = 1;
var startPositionY = 1;

var finishPositionX = size-2;
var finishPositionY = size-2;

var selectedClass = "";

var hasStart = false;
var hasFinish = false;

//map generation

var builderWall = document.getElementById("wall-block");
var builderEraser = document.getElementById("eraser");
var builderStart = document.getElementById("start-block");
var builderFinish = document.getElementById("finish-block");
var blocker = function(){
	if(this.id==="wall-block") selectedClass = "wall";
	if(this.id==="eraser") selectedClass = "";
	if(this.id==="start-block") selectedClass = "start";
	if(this.id==="finish-block") selectedClass = "finish";
}


builderWall.onclick = blocker;
builderEraser.onclick = blocker;
builderStart.onclick = blocker;
builderFinish.onclick = blocker;

	// for(let i=0; i<size; i++)
	// {
	// 	for(let j=0; j<size; j++)
	// 	{
	// 		let variant = Math.floor(Math.random()*4+1);
	// 		if(variant===1) block[i][j].className = "f-block " + "wall";
	// 		if(i===0||i===size-1) block[i][j].className = "f-block " + "wall";
	// 		if(j===0||j===size-1) block[i][j].className = "f-block " + "wall";
	// 	}
	// }


var f = function(){
	field.innerHTML = "";
	if(this.id ==="size20")
	{
		size = 20;
	}
	if(this.id ==="size30")
	{
		size = 30;
	}
	if(this.id ==="size40")
	{
		size = 40;
	}
	field.style.width = (size*20) + "px";
	hasStart = false;
	hasFinish = false;
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
			block[i][j].onclick = function(){
				if((i!==0)&&(i!==size-1)){
					if((j!==0)&&(j!==size-1)){
						if(selectedClass==="start") {
							if(!hasStart){
								startPositionX = i;
								startPositionY = j;
								hasStart=true;
							}
							else{
								if(block[startPositionX][startPositionY].className.includes(" start")){
									let str =  block[startPositionX][startPositionY].className;
									block[startPositionX][startPositionY].className=str.replace(" start","");
									startPositionX = i;
									startPositionY = j;
								}
							}
						}
						if(selectedClass==="finish") {
							if(!hasFinish){
								finishPositionX = i;
								finishPositionY = j;
								hasFinish=true;
							}
							else{
								if(block[finishPositionX][finishPositionY].className.includes(" finish")){
									let str =  block[finishPositionX][finishPositionY].className;
									block[finishPositionX][finishPositionY].className=str.replace(" finish","");
									finishPositionX = i;
									finishPositionY = j;
								}
							}
						}
						block[i][j].className = "f-block " + selectedClass;
						
					}
				}
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



// this shit below saves the map in one string
var fss = document.getElementById("saver");
fss.onclick = function(){

	var fieldSaved = [];

	for(let i=0; i<size; i++)
		{
			fieldSaved[i] = [];
			for(let j=0; j<size; j++)
			{
				fieldSaved[i][j] = "";
			}
		}
	for(let i=0; i<size; i++)
		{
			fieldSaved[i] = [];
			for(let j=0; j<size; j++)
			{
				if(block[i][j].className.includes("wall"))
					{
						fieldSaved[i][j] = "1";
					}
				else if(block[i][j].className.includes("start"))
					{
						fieldSaved[i][j] = "s";
					}
				else if(block[i][j].className.includes("finish"))
					{
						fieldSaved[i][j] = "f";
					}
				else fieldSaved[i][j] = "0";
			}

		}

	var str="";
	for(let i=0; i<size; i++)
		{
			for(let j=0; j<size; j++)
			{
				str+=fieldSaved[i][j]+" ";
			}
			//console.log(str);
			//str="";
		}
	var labstr = document.getElementById("code");
	code.innerHTML = str;
}