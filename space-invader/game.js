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