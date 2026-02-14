export function updateScore(scoreEl, score) {
  scoreEl.textContent = score;
}

export function updateLevel(levelEl, level) {
  levelEl.textContent = level;
}

export function showGameOver(overlay, title, text) {
  title.textContent = "Game Over";
  text.textContent = "Press R to restart";
  overlay.classList.remove("hidden");
}

export function hideGameOver(overlay) {
  overlay.classList.add("hidden");
}
