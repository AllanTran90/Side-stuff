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
