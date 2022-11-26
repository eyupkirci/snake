//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;

var finish = rows * cols - 1;
var progress;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeFood();
  setInterval(update, 1000 / 5); //200 milliseconds
  document.addEventListener("keyup", changeDirection);
};

function update() {
  if (gameOver) {
    return;
  }

  //board
  context.fillStyle = "grey";
  //   context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //snake eating food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    updateProgress();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over condition #1
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    updateScore();
  }
  //game over condition #1
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      updateScore();
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}

//to place the food randomly
function placeFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function updateProgress() {
  progress = document.getElementById("progress");
  progress.setAttribute("value", progress.value + 1);

  let score = document.getElementById("score");
  score.innerText = `${progress.value}`;

  if (progress.value === finish) {
    alert("You win");
    return;
  }
}

function updateScore() {
  let score = document.getElementById("progress").value;
  alert(`Game Over. Your Score is ${score}`);
}
