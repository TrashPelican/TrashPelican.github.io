var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;
var CPUspeed = 3;
var ballX = w/2;
var ballY = h/2;
var dx = 2;
var dy = 2;
var scorePlayer = 0;
var scoreCPU = 0;
var playerPaddleY = h/2-50;
var CPUPaddleY = h/2 -50;

function drawStage(){
    ctx.beginPath();
    ctx.rect(0,0,w,h);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0,0,5,600);
    ctx.rect(0,0,600,5);
    ctx.rect(0,295,600,5);
    ctx.rect(595,0,5,600);
    for(var i = 0;i<=500;i+=15){
        ctx.rect(w/2-2.5,i+5,5,10);
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX,ballY,7.5,Math.PI*2,false);
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
    ctx.closePath();
}

function drawPaddleCPU(){
    ctx.beginPath();
    ctx.rect(20,CPUPaddleY,5,100);
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
    ctx.closePath();
}

function drawPaddlePlayer(){
    ctx.beginPath();
    ctx.rect(575,playerPaddleY,5,100);
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
    ctx.closePath();
}

function score(){
    ctx.font = 'bold 32px courier new';
    ctx.fillText(scorePlayer,w/2+100,50);
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
}

function CPUscore(){
    ctx.fillText(scoreCPU,w/2-100,50);
    ctx.fillStyle = '#FFFFFF'
    ctx.fill();
}

function winCheck(){
    if(scorePlayer == 11){
        alert("Player Wins!");
        document.location.reload();
    }
    else if(scoreCPU == 11){
        alert("CPU Wins!");
        document.location.reload();
    }
}

function controls(){
    if(ballY >= 295 || ballY <= 5){
        dy = -dy;
    }
    if(ballY > playerPaddleY && ballY < playerPaddleY+100 && ballX >= 574-5 && ballX <= 576-5) {
        dx = -dx;
    }
    if(ballY > CPUPaddleY && ballY < CPUPaddleY+100 && ballX >= 24 && ballX <= 26) {
        dx = -dx;
    }
    if(upPressed == true && playerPaddleY >= 5){
        playerPaddleY -=2;
    }
    if(downPressed == true && playerPaddleY <= 200){
        playerPaddleY += 2;
    }
    if(ballX-7.5>=600){
        scoreCPU+=1;
        ballX = w/2;
        ballY = h/2;
    }
    else if(ballX+7.5 <= 0){
        scorePlayer+=1;
        ballX = w/2;
        ballY = h/2;
        dx = -dx;
    }
}

function AI(){
    if(ballX <= w/2 + 20){
        if(ballY >= CPUPaddleY+100){
            CPUPaddleY+=CPUspeed;
        }
        else if(ballY <= CPUPaddleY){
            CPUPaddleY-=CPUspeed;
        }
    }
    else if(ballX >= w/2 + 20){
        if(CPUPaddleY + 50 > h/2){
            CPUPaddleY-=CPUspeed;
        }
        else if(CPUPaddleY + 50 < h/2){
            CPUPaddleY+=CPUspeed;
        }
    }
}

function update(){
    ctx.clearRect(0,0,w,h);
    drawStage();
    drawBall();
    drawPaddlePlayer();
    score();
    CPUscore();
    drawPaddleCPU();
    winCheck();
    controls();
    AI();
    ballX += dx;
    ballY += dy;
}
setInterval(update, 10);