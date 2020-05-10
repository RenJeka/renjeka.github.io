window.addEventListener("load", function () {
    var myCanvas = this.document.querySelector("canvas");
    var ctx = myCanvas.getContext("2d");

    var shiftX = 0;
    var shiftY = 0;
    var startX = 160;
    var startY = 141;
    var currentX;
    var currentY;

    var myGradient = ctx.createLinearGradient(startX,startY,startX + 250,startY);

    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    myGradient.addColorStop(0.25, "red");
    myGradient.addColorStop(0.25, "white");
    myGradient.addColorStop(0.75, "white");
    myGradient.addColorStop(0.75, "red");
    ctx.fillStyle = myGradient;
    
    //=============SHADOW============
    ctx.shadowColor = "gray";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 10;
    // ctx.globalCompositeOperation = "destination-out";
    //===============================


    //=========ФЛАГ=========================
    ctx.lineWidth = 0.01;

    ctx.beginPath();
    ctx.moveTo(startX+shiftX, startY+shiftY);
    ctx.bezierCurveTo(212+shiftX, 173+shiftY, 356+shiftX, 89+shiftY, 414+shiftX, 128+shiftY);
    ctx.lineTo(414,278 );
    ctx.bezierCurveTo(390 , 230 , 230 , 330 , 160 , 291 );
    ctx.closePath();
    // ctx2.globalCompositeOperation = "sourse-out";
    // ctx.globalCompositeOperation='overlay';
    ctx.fill();
    ctx.stroke();   
    //======================================


    //===============КЛЕНОВЫЙ ЛИСТОК============
    function shiftLine(shiftX, shiftY) {

        currentX = currentX + shiftX;
        currentY = currentY + shiftY;
        ctx2.lineTo(currentX, currentY);

    }

    var ctx2 = myCanvas.getContext("2d");
    // ctx2.scale(-1, 1);
    // ctx2.translate(100, 100);
    var shift1X = 130;
    var shift1Y = 90;
    // ctx2.moveTo(startX +shift1X,startY+shift1Y);
    // ctx2.transform(1,0.05,0.05,1,1,1);
    
    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    ctx2.save();
    currentX = 0;
    currentY = 0;
    ctx2.translate(280,240);
    ctx2.rotate(-0.5);
    ctx2.transform(1,0.2,-0.5,1,1,1);
    ctx2.scale(-1, 0.89);
    ctx2.beginPath();
    ctx2.moveTo(2,-6);
    shiftLine(30,0);
    shiftLine(-3,-10);
    shiftLine(15,-20);
    shiftLine(-5,-3);
    shiftLine(5,-15);
    shiftLine(-15,2);
    shiftLine(-2,-7);
    shiftLine(-15,20);
    shiftLine(7,-35);
    shiftLine(-8,4);
    shiftLine(-10,-27);
    shiftLine(0,120);
    shiftLine(4,0);
    ctx2.closePath();
    ctx2.restore();
    ctx2.fillStyle="red";
    // ctx2.globalCompositeOperation = "destination-in";
    ctx2.fill();
    ctx2.stroke();


    ctx2.save();
    currentX = 0;
    currentY = 0;
    ctx2.translate(280,235);
    ctx2.beginPath();
    ctx2.moveTo(currentX,currentY);
    shiftLine(30,0);
    shiftLine(-3,-10);
    shiftLine(15,-20);
    shiftLine(-5,-3);
    shiftLine(5,-15);
    shiftLine(-15,2);
    shiftLine(-2,-7);
    shiftLine(-15,20);
    shiftLine(7,-35);
    shiftLine(-8,4);
    shiftLine(-10,-20);
    shiftLine(0,120);
    shiftLine(4,0);
    ctx2.closePath();
    ctx2.restore();
    ctx2.fillStyle="red";
    ctx2.fill();
    ctx2.stroke();

    

    
    console.dir(ctx2);

    //======================================



});
    
