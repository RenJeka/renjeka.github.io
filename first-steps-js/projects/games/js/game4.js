window.addEventListener("load",function () {
	var div1 = document.getElementById("div1");
	var moveDistance = 1;
	var divWidth = parseInt(this.window.getComputedStyle(div1).width);
	var divHeight = parseInt(this.window.getComputedStyle(div1).height);

	var currentPosX = window.innerWidth / 2 -(divWidth/2);
	var currentPosY = window.innerHeight / 2 -(divHeight/2);
	
	div1.style.top = currentPosY + "px";
	div1.style.left = currentPosX + "px";




	this.document.addEventListener("keydown",function (e) {
		var whichKey = String.fromCharCode(e.keyCode).toLowerCase();
		var tempPos;
		console.log(whichKey);

		switch (whichKey) {

			case "&":
				currentPosY = currentPosY - moveDistance;
				div1.style.top = currentPosY  + "px";
				div1.style.backgroundImage= "url('img/up.gif')" ;
				break;

			case "'":
				currentPosX = currentPosX + moveDistance;
				div1.style.left = currentPosX  + "px";
				div1.style.backgroundImage= "url('img/right.gif')" ;
				break;

			case "(":
				currentPosY = currentPosY + moveDistance;
				div1.style.top = currentPosY  + "px";
				div1.style.backgroundImage= "url('img/down.gif')" ;
				break;

			case "%":
				currentPosX = currentPosX - moveDistance;
				div1.style.left = currentPosX  + "px";
				div1.style.backgroundImage= "url('img/left.gif')" ;
				break;
		
		}
	});

	this.document.addEventListener("keyup",function () {
		div1.style.backgroundImage= "url('img/stand.gif')" ;
	});

});