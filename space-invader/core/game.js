import { createPlayer, movePlayer, DEFAULT_PLAYER_STATS } from "../entities/player.js";
import { spawnEnemies } from "../entities/enemies.js";
import { shoot, updateBullets } from "../entities/bullets.js";

export function initGame() {
  const canvas = document.getElementById("game");
  if (!canvas) throw new Error("Canvas not found");

  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;

  // ===== STATE =====
  let keys = new Set();
  let player = createPlayer(W, H);
  let playerStats = { ...DEFAULT_PLAYER_STATS };
  let enemies = spawnEnemies(1);
  let bullets = [];

  let lastShot = 0;
  let lastTime = 0;

  // ===== INPUT =====
  window.addEventListener("keydown", e =>
    keys.add(e.key.toLowerCase())
  );

  window.addEventListener("keyup", e =>
    keys.delete(e.key.toLowerCase())
  );

  // ===== UPDATE =====
  function update(time) {
    const dt = lastTime ? time - lastTime : 16.67;
    lastTime = time;

    movePlayer(player, keys, playerStats, W);

    if (time - lastShot > playerStats.fireRate) {
      bullets.push(shoot(player, playerStats));
      lastShot = time;
    }

    updateBullets(bullets);
  }

  // ===== DRAW =====
  function draw() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    // Player
    ctx.fillStyle = "#EAF1FF";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Bullets
    ctx.fillStyle = "#7CFFCB";
    bullets.forEach(b =>
      ctx.fillRect(b.x, b.y, b.w, b.h)
    );

    // Enemies
    ctx.fillStyle = "#FF6B8A";
    enemies.forEach(e =>
      ctx.fillRect(e.x, e.y, e.w, e.h)
    );
  }

  function loop(time) {
    update(time);
    draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
