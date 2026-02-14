export const POWER_TYPES = {
  FIRE_RATE: "fire_rate",
  BULLET_SPEED: "bullet_speed",
  MULTI_SHOT: "multi_shot",
  MOVE_SPEED: "move_speed"
};

export const POWER_ICONS = {
  fire_rate: "⚡",
  bullet_speed: "➚",
  multi_shot: "✶",
  move_speed: "»"
};

export function randomPowerType() {
  const arr = Object.values(POWER_TYPES);
  return arr[Math.floor(Math.random() * arr.length)];
}
