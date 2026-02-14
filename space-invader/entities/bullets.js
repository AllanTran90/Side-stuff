export function shoot(player, stats) {
  return {
    x: player.x + player.w / 2 - 2,
    y: player.y,
    w: 4,
    h: 10,
    speed: stats.bulletSpeed
  };
}

export function updateBullets(bullets) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;

    if (bullets[i].y + bullets[i].h < 0) {
      bullets.splice(i, 1);
    }
  }
}
