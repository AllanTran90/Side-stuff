export const DEFAULT_PLAYER_STATS = {
  fireRate: 100,
  bulletSpeed: 7,
  moveSpeed: 4,
  bulletCount: 1
};

export function createPlayer(W, H) {
  return {
    x: W / 2 - 18,
    y: H - 52,
    w: 36,
    h: 16
  };
}

export function movePlayer(player, keys, stats, W) {
  if (keys.has("arrowleft") || keys.has("a"))
    player.x -= stats.moveSpeed;

  if (keys.has("arrowright") || keys.has("d"))
    player.x += stats.moveSpeed;

 player.x = Math.max(0, Math.min(W - player.w, player.x));
}