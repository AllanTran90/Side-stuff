const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const highScoreEl = document.getElementById("highscore");
const overlay =document.getElementById("overlay");
const overTitle = document.getElementById("overTitle");
const overText = document.getElementById("overText");

const W = canvas.width;
const H = canvas.height;

// input
const key = new Set();
window.addEventListener("keydown", (e) => {
    key.add(e.key.toLowerCase());

    if (e.key.toLowerCase() === "r" && gameOver){
        resetGame();
    }
});
window.addEventListener("keydown", (e) => key.delete(e.key.toLowerCase()));

// game start
let gameOver =false;
let score = 0;
let level = 1;

// highscore(localstorage)
let highScore = localStorage.getItem("spaceInvaderHighScore");
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
    fireRate: 300,
    bulletSpeed: 7,
    moveSpeed: 4,
    bulletCount: 1
};

// object
let bullet = [];
let enemies = [];
let powerUps = [];

// enemies
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

function randomPowerType(){
    const arr = Object.values(POWER_TYPES);
    return arr[Math.floor(Math.random() * arr.length)];
}

function applyPowerUp(type){
    switch(type){
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

// spawn
function spwanEnemies(){
    enemies = [];

    const row = 4 + Math.min(2, Math.floor((level - 1) / 2));
    const cols = 9;
    const pad = 10;
    const ew = 28;
    const eh = 18;
    const startX = 34;
    const startY = 70;

    for ( let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
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
    enemyStepDown = 16 + Math.min(10, level);
}
function spawnPowerUp(x, y){
    powerUps.push({
          x: x - 10,
    y: y - 10,
    w: 20,
    h: 20,
    type: randomPowerType(),
    speed: 2.2
    })
}

// reset the game
function resetGame(){
     gameOver = false;
  score = 0;
  level = 1;

  playerStats.fireRate = 300;
  playerStats.bulletSpeed = 7;
  playerStats.moveSpeed = 4;
  playerStats.bulletCount = 1;

  bullets = [];
  powerUps = [];
  player.x = W / 2 - player.w / 2;

  spawnEnemies();

  overlay.classList.add("hidden");

  scoreEl.textContent = score;
  levelEl.textContent = level;

  lastShot = 0;
  lastTime = 0;
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
function shoot(){
    const count = playerStats.bulletCount;
    const spread = 12;

    for (let i = 0; i < count; i++){
        const offset = (i - (count - 1) / 2) * spread;
    bullets.push({
      x: player.x + player.w / 2 - 2 + offset,
      y: player.y,
      w: 4,
      h: 10,
      speed: playerStats.bulletSpeed
    });
    }
}

function autoShoot(time) {
  if (time - lastShot > playerStats.fireRate) {
    shoot();
    lastShot = time;
  }
}

// update
function update(dt, time){
    if(keys.has("arrowleft") || keys.has("a")){
        player.x -= playerStats.moveSpeed; 
    }
    if(keys.has("arrowright") || key.has("d")){
        player.x += playerStats.moveSpeed;
    }
    player.x = clamp(player.x, 10, W - player.w - 10);

    autoShoot(time);

    // bullets

    for(let i = bullet.length -1; i >= 0; i--){
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y + bullets[i].h < 0){
            bullets.splice(i, 1);
        }
    }
    // enemy movement
    if (enemies.length > 0){
        let minX = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const e of enemies){
            minX = Math.min(minX, e.x);
            maxX = Math.max(maxX, e.x + e.w);
            maxY = Math.max(maxY, e.y + e.h);
        }
        if(maxX >= W - 14 ||minX <= 14){
            enemyDir *= -1;
            for(const e of enemies){
                e.y += enemyStepDown; 
            }
        }
    }else{
        for (const e of enemies){
            e.x += enemyDir * enemySpeed * (dt / 16.67);
        }
    }
    if(maxY >= player.y - 8){
        endGame();
    }
}

// bullet vs enemy
for(let bi = bullets.length - 1; bi >= 0; bi--){
    for(let ei = enemies.length - 1; ei >= 0; ei--){
        if (rectsOverlap(bullets[bi], enemies[ei])){
            bullets.splice(bi, 1);
            const dead = enemies.splice(ei, 1)[0];

            score += 10;
            scoreEl.textContent = score;

            // update highscore
            if(score > highScore){
                highScore = score;
                highScoreEl.textContent = highScore;
                localStorage.setItem("SpaceInvaderHighScore")
            }
            if (Math.random() < 0.18) {
                spawnPowerUp(dead.x + dead.w / 2, dead.y + dead.h / 2);
        }
        break;
        }
    }
}
// powerups
for (let i = powerUps.length - 1; i >= 0; i--){
    powerUps[i].y += powerUps[i].speed;

    if(rectsOverlap(player, powerUps[i])){
        applyPowerUp(powerUps[i].type);
        powerUps.splice(i, 1);
        continue;
    }
    if(powerUps[i].y > H + 30){
        powerUps.splice(i, 1);
    }
}