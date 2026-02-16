// 🔹 Skapar enemies
export function spawnEnemies(level) {
  const enemies = [];

  const rows = 5 + Math.floor(level / 2);
  const cols = 10;
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
        h: eh,
        speed: 1 + level *0.2,
        direction: 1
      });
    }
  }

  return enemies;
}


// 🔹 Uppdaterar enemies (rörelse)
export function updateEnemies(enemies, canvasWidth) {
  let shouldDrop = false;

  enemies.forEach(enemy => {
    enemy.x += enemy.speed * enemy.direction;

    if (enemy.x <= 0 || enemy.x + enemy.w >= canvasWidth) {
      shouldDrop = true;
    }
  });

  if (shouldDrop) {
    enemies.forEach(enemy => {
      enemy.direction *= -1;
      enemy.y += 20;
    });
  }
}
