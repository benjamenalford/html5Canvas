var a_canvas = document.getElementById("canvas");
var a_context = a_canvas.getContext("2d");

var x = 25;
var y = 1;

var timer = 0;

var paddleSpeed = 4;

var boardSizeX = 600;
var boardSizeY = 600;

var ballVelcoityConstant = 3;
var ballVelocityX = ballVelcoityConstant;
var ballVelocityY = 0;

var ballX = boardSizeX / 2;
var ballY = boardSizeY / 2;
var ballSize = 25;
var ballColor = "red";


function drawBall() {
    a_context.fillStyle = ballColor;
    a_context.fillRect(ballX, ballY, ballSize, ballSize);
}

function drawTimer() {
    a_context.font = "bold 12px sans-serif";
    a_context.fillText(timer, 0, boardSizeX)
}

function clearScreen() {
    a_canvas.width = a_canvas.width;
}

function drawScreen() {
    drawPaddle();
    drawBall();
}

function calcBallMovement() {
    //check ball bounds
    if (ballX <= 0) ballVelocityX = ballVelcoityConstant;
    if (ballX + ballSize >= boardSizeX)
        ballVelocityX = 0 - ballVelcoityConstant;

    ballX = ballX + ballVelocityX;
    ballY = ballY + ballVelocityY;
}

function wait() {
    clearScreen();
    drawTimer();
    calcBallMovement();
    drawScreen();
    setTimeout('wait()', 30);
    timer++;
}

function drawPaddle() {
    //check paddle bounds
    if (y <= 0) y = 0;
    if (y + 75 >= boardSizeY)
        y = boardSizeY - 75;

    a_context.fillStyle = "blue";
    a_context.fillRect(x, y, 25, 75);

}

function drawSquare(context, x, y, size, color) {
    var width = size;
    var height = size;
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}


document.onkeydown = function(event) {
    var keyCode;

    if (event == null) {
        keyCode = window.event.keyCode;
    } else {
        keyCode = event.keyCode;
    }

    switch (keyCode) {
        // left
        case 37:
            x = x - paddleSpeed;
            break;

            // up
        case 38:
            y = y - paddleSpeed;
            break;

            // right
        case 39:
            x = x + paddleSpeed;
            break;

            // down
        case 40:
            y = y + paddleSpeed;
            break;

        default:
            break;
    }

}
wait();