export function spawnEnemies(level) {
  const enemies = [];

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

  return enemies;
}
