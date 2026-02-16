export function spawnPowerUp(x, y) {
  return {
    x,
    y,
    w: 20,
    h: 20,
    speed: 2,
    type: "rapid"
  };
}

export function updatePowerUps(powerUps, player, stats, overlapFn) {

  for (let i = powerUps.length - 1; i >= 0; i--) {

    powerUps[i].y += powerUps[i].speed;

    if (overlapFn(powerUps[i], player)) {

      stats.fireRate = 50;

      setTimeout(() => {
        stats.fireRate = 100;
      }, 5000);

      powerUps.splice(i, 1);
    }
  }
}
