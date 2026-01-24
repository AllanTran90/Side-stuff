const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const highScoreEl = document.getElementById("highscore");
const powerHudEl = document.getElementById("powerHud");
const overlay = document.getElementById("overlay");
const overTitle = document.getElementById("overTitle");
const overText = document.getElementById("overText");

const W = canvas.width;
const H = canvas.height;

// background
const BG_COLOR = "#050510";

// input
const keys = new Set();

window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());

  if (e.key.toLowerCase() === "r" && gameOver) {
    resetGame();
  }
});

window.addEventListener("keyup", (e) => {
  keys.delete(e.key.toLowerCase());
});

// game state
let gameOver = false;
let score = 0;
let level = 1;

// players lives
let playerLives = 2;
let invincible = false;
let invincibleTimer = 0; 

// highscore
let highScore = localStorage.getItem("spaceInvadersHighScore");
highScore = highScore ? Number(highScore) : 0;
highScoreEl.textContent = highScore;

// player
const player = {
  x: W / 2 - 18,
  y: H - 52,
  w: 36,
  h: 16
};

const playerStats = {
  fireRate: 100,
  bulletSpeed: 7,
  moveSpeed: 4,
  bulletCount: 1
};

// objects
let bullets = [];
let enemies = [];
let powerUps = [];

// enemy movement
let enemyDir = 1;
let enemySpeed = 0.55;
let enemyStepDown = 16;

// timing
let lastShot = 0;
let lastTime = 0;

// power ups
const POWER_TYPES = {
  FIRE_RATE: "fire_rate",
  BULLET_SPEED: "bullet_speed",
  MULTI_SHOT: "multi_shot",
  MOVE_SPEED: "move_speed"
};

function randomPowerType() {
  const arr = Object.values(POWER_TYPES);
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyPowerUp(type) {
  switch (type) {
    case POWER_TYPES.FIRE_RATE:
      playerStats.fireRate = Math.max(80, playerStats.fireRate - 30);
      break;
    case POWER_TYPES.BULLET_SPEED:
      playerStats.bulletSpeed += 1;
      break;
    case POWER_TYPES.MULTI_SHOT:
      playerStats.bulletCount += 1;
      break;
    case POWER_TYPES.MOVE_SPEED:
      playerStats.moveSpeed += 0.5;
      break;
  }
}

// power hud
function updatePowerHud() {
  const parts = [];

  if (playerStats.bulletCount > 1) parts.push(`Multi x${playerStats.bulletCount}`);
  if (playerStats.fireRate < 300) parts.push(`Fire ${playerStats.fireRate}ms`);
  if (playerStats.moveSpeed > 4) parts.push(`Speed +${(playerStats.moveSpeed - 4).toFixed(1)}`);
  if (playerStats.bulletSpeed > 7) parts.push(`Bullet +${playerStats.bulletSpeed - 7}`);

  powerHudEl.textContent =
    parts.length > 0 ? `Powers: ${parts.join(" | ")}` : "Powers: -";
}

// spawn enemies
function spawnEnemies() {
  enemies = [];

  const rows = 4 + Math.min(2, Math.floor((level - 1) / 2));
  const cols = 9;
  const pad = 10;
  const ew = 28;
  const eh = 18;
  const startX = 34;
  const startY = 70;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      enemies.push({
        x: startX + c * (ew + pad),
        y: startY + r * (eh + pad),
        w: ew,
        h: eh
      });
    }
  }

  enemyDir = 1;
  enemySpeed = 0.55 + (level - 1) * 0.12;
}

function spawnPowerUp(x, y) {
  powerUps.push({
    x: x - 10,
    y: y - 10,
    w: 20,
    h: 20,
    type: randomPowerType(),
    speed: 2.2
  });
}

// helpers
function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// shooting
function shoot() {
  bullets.push({
    x: player.x + player.w / 2 - 2,
    y: player.y,
    w: 4,
    h: 10,
    speed: playerStats.bulletSpeed
  });
}

function autoShoot(time) {
  if (time - lastShot > playerStats.fireRate) {
    shoot();
    lastShot = time;
  }
}

// update
function update(dt, time) {
  // player movement
  if (keys.has("arrowleft") || keys.has("a")) player.x -= playerStats.moveSpeed;
  if (keys.has("arrowright") || keys.has("d")) player.x += playerStats.moveSpeed;
  player.x = clamp(player.x, 10, W - player.w - 10);

  autoShoot(time);

  // bullets movement
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;
    if (bullets[i].y + bullets[i].h < 0) {
      bullets.splice(i, 1);
    }
  }

  // enemy movement
  if (enemies.length > 0) {
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const e of enemies) {
      minX = Math.min(minX, e.x);
      maxX = Math.max(maxX, e.x + e.w);
      maxY = Math.max(maxY, e.y + e.h);
    }

    if (enemyDir === 1 && maxX >= W - 14) {
      enemyDir = -1;
      enemies.forEach(e => e.y += enemyStepDown);
    } 
    else if (enemyDir === -1 && minX <= 14) {
      enemyDir = 1;
      enemies.forEach(e => e.y += enemyStepDown);
    } 
    else {
      enemies.forEach(e => e.x += enemyDir * enemySpeed * (dt / 16.67));
    }

    if (maxY >= player.y - 8) {
      endGame();
    }
  }

  // bullet vs enemy
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      if (rectsOverlap(bullets[bi], enemies[ei])) {
        bullets.splice(bi, 1);
        const dead = enemies.splice(ei, 1)[0];

        score += 10;
        scoreEl.textContent = score;

        if (score > highScore) {
          highScore = score;
          highScoreEl.textContent = highScore;
          localStorage.setItem("spaceInvadersHighScore", highScore);
        }

        if (Math.random() < 0.18) {
          spawnPowerUp(dead.x + dead.w / 2, dead.y + dead.h / 2);
        }
        break;
      }
    }
  }

  // power ups
  for (let i = powerUps.length - 1; i >= 0; i--) {
    powerUps[i].y += powerUps[i].speed;

    if (rectsOverlap(player, powerUps[i])) {
      applyPowerUp(powerUps[i].type);
      updatePowerHud();
      powerUps.splice(i, 1);
      continue;
    }

    if (powerUps[i].y > H + 30) {
      powerUps.splice(i, 1);
    }
  }

  // next level
  if (!gameOver && enemies.length === 0) {
    level++;
    levelEl.textContent = level;
    bullets = [];
    powerUps = [];
    spawnEnemies();
  }
}

// draw
function draw() {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, W, H);

  // player
  ctx.fillStyle = "#EAF1FF";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // bullets
  ctx.fillStyle = "#7CFFCB";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

  // enemies
  ctx.fillStyle = "#FF6B8A";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));

  // power ups
  ctx.font = "14px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const p of powerUps) {
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(p.x, p.y, p.w, p.h);

    ctx.fillStyle = "#FFE58A";
    let icon = "?";
    if (p.type === POWER_TYPES.FIRE_RATE) icon = "⚡";
    if (p.type === POWER_TYPES.BULLET_SPEED) icon = "➚";
    if (p.type === POWER_TYPES.MULTI_SHOT) icon = "✶";
    if (p.type === POWER_TYPES.MOVE_SPEED) icon = "»";

    ctx.fillText(icon, p.x + p.w / 2, p.y + p.h / 2);
  }
}

// game over
function endGame() {
  gameOver = true;
  overTitle.textContent = "Game Over";
  overText.textContent = "Press R to restart";
  overlay.classList.remove("hidden");
}

// reset game
function resetGame() {
  gameOver = false;
  score = 0;
  level = 1;

  bullets = [];
  powerUps = [];

  playerStats.fireRate = 100;
  playerStats.bulletSpeed = 7;
  playerStats.moveSpeed = 4;
  playerStats.bulletCount = 1;

  player.x = W / 2 - player.w / 2;

  spawnEnemies();
  updatePowerHud();

  overlay.classList.add("hidden");
  scoreEl.textContent = score;
  levelEl.textContent = level;

  lastShot = 0;
  lastTime = 0;
}

// loop
function loop(time) {
  if (!gameOver) {
    const dt = lastTime ? time - lastTime : 16.67;
    lastTime = time;
    update(dt, time);
  }

  draw();
  requestAnimationFrame(loop);
}

spawnEnemies();
updatePowerHud();
requestAnimationFrame(loop);
