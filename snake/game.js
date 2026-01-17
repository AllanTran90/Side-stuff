let gameOver = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highscore");

const tileSize = 20;
const tiles = canvas.width / tileSize;

// highscore
let highscore = localStorage.getItem("snakeHighScore");
highscore = highscore ? Number(highscore) : 0;
highScoreEl.textContent = highscore;

// game state
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

let direction = { x: 1, y: 0 };
let score = 0;

let food = spawnFood();
let bonusFood = null;
let bonusTimer = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * tiles),
    y: Math.floor(Math.random() * tiles)
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // snake
  ctx.fillStyle = "#1f2b16";
  snake.forEach(part => {
    ctx.fillRect(
      part.x * tileSize,
      part.y * tileSize,
      tileSize,
      tileSize
    );
  });

  // food
  ctx.fillStyle = "#000";
  ctx.fillRect(
    food.x * tileSize,
    food.y * tileSize,
    tileSize,
    tileSize
  );

  // bonus food
  if (bonusFood) {
    ctx.fillStyle = bonusTimer % 20 < 10 ? "#000" : "#556b2f";
    ctx.fillRect(
      bonusFood.x * tileSize,
      bonusFood.y * tileSize,
      tileSize,
      tileSize
    );
  }
}

function update() {
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  // wrap-around
  if (newHead.x < 0) newHead.x = tiles - 1;
  if (newHead.x >= tiles) newHead.x = 0;
  if (newHead.y < 0) newHead.y = tiles - 1;
  if (newHead.y >= tiles) newHead.y = 0;

  // self collision
  for (let part of snake) {
    if (part.x === newHead.x && part.y === newHead.y) {
      clearInterval(gameLoop);
      gameOver = true;

      if (score > highscore) {
        localStorage.setItem("snakeHighScore", score);
      }
      return;
    }
  }

  snake.unshift(newHead);

  // eat food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = spawnFood();

    if (Math.random() < 0.2) {
      bonusFood = spawnFood();
      bonusTimer = 100;
    }
  }
  // eat bonus
  else if (
    bonusFood &&
    newHead.x === bonusFood.x &&
    newHead.y === bonusFood.y
  ) {
    score += 5;
    scoreEl.textContent = score;
    bonusFood = null;
  }
  else {
    snake.pop();
  }

  // bonus timeout
  if (bonusFood) {
    bonusTimer--;
    if (bonusTimer <= 0) bonusFood = null;
  }
}

document.addEventListener("keydown", e => {
  if (gameOver && e.key === "Enter") {
    location.reload();
  }

  if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
});

const gameLoop = setInterval(() => {
  update();
  draw();
}, 150);
