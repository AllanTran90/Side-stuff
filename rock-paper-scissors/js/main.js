import { score, gameOver, maxWins, resetGameState } from './state.js';
import { getRandomChoice, determineWinner } from './game.js';
import { render, showFinalWinner } from './ui.js';

const buttons = document.querySelectorAll('[data-choice]');
const resetButton = document.getElementById('reset');

buttons.forEach(button =>
  button.addEventListener('click', handlePlayerChoice)
);

resetButton.addEventListener('click', resetGame);

function handlePlayerChoice(e) {
  if (gameOver) return;

  buttons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

  const player = e.currentTarget.dataset.choice;
  const computer = getRandomChoice();
  const winner = determineWinner(player, computer);

  if (winner !== 'draw') {
    score[winner]++;
  }

  render(player, computer, winner);

  checkGameOver();
}

function checkGameOver() {
  if (score.player === maxWins) {
    showFinalWinner('player');
    endGame();
  }

  if (score.computer === maxWins) {
    showFinalWinner('computer');
    endGame();
  }
}

function endGame() {
  import('./state.js').then(module => {
    module.gameOver = true;
  });
}

function resetGame() {
  resetGameState();
  document.getElementById('result').textContent = 'Choose an altenetiv';
  document.getElementById('score').textContent = 'You: 0 | Computer: 0';
}

function celebrate() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}