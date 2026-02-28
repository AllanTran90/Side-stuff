import { createPlayer, movePlayer, DEFAULT_PLAYER_STATS } from "../entities/player.js";
import { spawnEnemies, updateEnemies } from "../entities/enemies.js";
import { shoot, updateBullets } from "../entities/bullets.js";
import { spawnPowerUp, updatePowerUps } from "../entities/powerups.js";
import { rectsOverlap } from "./utils.js";

export function initGame() {

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const resetBtn = document.getElementById("resetBtn");

  const W = canvas.width;
  const H = canvas.height;

  let keys = new Set();
  let level = 1;

  let player = createPlayer(W, H);
  let playerStats = { ...DEFAULT_PLAYER_STATS };

  let enemies = spawnEnemies(level);
  let bullets = [];
  let enemyBullets = [];
  let powerUps = [];

  let playerHealth = 3;
  let lastShot = 0;
  let gameOver = false;

  let score = 0;
  let highScore = Number(localStorage.getItem("highScore")) || 0;

  // -------------------
  // RESET GAME
  // -------------------

  function resetGame() {
    level = 1;
    player = createPlayer(W, H);
    playerStats = { ...DEFAULT_PLAYER_STATS };

    enemies = spawnEnemies(level);
    bullets = [];
    enemyBullets = [];
    powerUps = [];

    playerHealth = 3;
    lastShot = 0;
    score = 0;
    gameOver = false;
  }

  resetBtn.addEventListener("click", resetGame);

  // -------------------
  // INPUT
  // -------------------

  window.addEventListener("keydown", e => {
    keys.add(e.key.toLowerCase());
  });

  window.addEventListener("keyup", e => {
    keys.delete(e.key.toLowerCase());
  });

  // -------------------
  // ENEMY SHOOT
  // -------------------

  function enemyShoot() {
    if (Math.random() < 0.01 && enemies.length > 0) {
      const shooter = enemies[Math.floor(Math.random() * enemies.length)];

      enemyBullets.push({
        x: shooter.x + shooter.w / 2 - 2,
        y: shooter.y + shooter.h,
        w: 4,
        h: 10,
        speed: 4
      });
    }
  }

  function updateEnemyBullets() {
    for (let i = enemyBullets.length - 1; i >= 0; i--) {

      enemyBullets[i].y += enemyBullets[i].speed;

      if (rectsOverlap(enemyBullets[i], player)) {
        enemyBullets.splice(i, 1);
        playerHealth--;

        if (playerHealth <= 0) {
          gameOver = true;
        }
      }
    }
  }

  // -------------------
  // COLLISIONS
  // -------------------

  function handleCollisions() {
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      for (let ei = enemies.length - 1; ei >= 0; ei--) {

        if (rectsOverlap(bullets[bi], enemies[ei])) {

          const deadEnemy = enemies[ei];

          bullets.splice(bi, 1);
          enemies.splice(ei, 1);

          score += 100;

          if (Math.random() < 0.2) {
            powerUps.push(spawnPowerUp(deadEnemy.x, deadEnemy.y));
          }

          break;
        }
      }
    }
  }

  // -------------------
  // UPDATE
  // -------------------

  function update(time) {

    if (gameOver) return;

    movePlayer(player, keys, playerStats, W);

    if (keys.has(" ") && time - lastShot > playerStats.fireRate) {
      bullets.push(shoot(player, playerStats));
      lastShot = time;
    }

    updateEnemies(enemies, W);
    updateBullets(bullets);
    enemyShoot();
    updateEnemyBullets();
    handleCollisions();
    updatePowerUps(powerUps, player, playerStats, rectsOverlap);

    // Next level
    if (enemies.length === 0) {
      level++;
      enemies = spawnEnemies(level);
    }

    // Highscore update
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  }

  // -------------------
  // DRAW
  // -------------------

  function draw() {

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    // Player
    ctx.fillStyle = "#EAF1FF";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Bullets
    ctx.fillStyle = "#7CFFCB";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

    // Enemy bullets
    ctx.fillStyle = "#FF4444";
    enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

    // Enemies
    ctx.fillStyle = "#FF6B8A";
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));

    // Powerups
    ctx.fillStyle = "yellow";
    powerUps.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

    // Health bar
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, playerHealth * 40, 15);

    // Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 20, 60);
    ctx.fillText("Highscore: " + highScore, 20, 85);

    // Game Over
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", W / 2, H / 2);

      resetBtn.style.display = "block";
    } else {
      resetBtn.style.display = "none";
    }
  }

  function loop(time) {
    update(time);
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}