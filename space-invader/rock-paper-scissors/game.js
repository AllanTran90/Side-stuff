console.log('GAME JS LOADED');

// ======================
// DOM
// ======================
const buttons = document.querySelectorAll('button');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');

// ======================
// GAME STATE
// ======================
const choices = ['rock', 'paper', 'scissors'];

const score = {
  player: 0,
  computer: 0
};

// ======================
// INIT
// ======================
buttons.forEach(button => {
  button.addEventListener('click', handlePlayerChoice);
});

// ======================
// EVENT HANDLER
// ======================
function handlePlayerChoice(event) {
  const playerChoice = event.currentTarget.dataset.choice;
  const computerChoice = getComputerChoice();

  const winner = getWinner(playerChoice, computerChoice);
  updateScore(winner);
  updateUI(playerChoice, computerChoice, winner);
}

// ======================
// GAME LOGIC
// ======================
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(player, computer) {
  if (player === computer) return 'draw';

  const winConditions = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock'
  };

  return winConditions[player] === computer ? 'player' : 'computer';
}

// ======================
// STATE UPDATES
// ======================
function updateScore(winner) {
  if (winner === 'player') score.player++;
  if (winner === 'computer') score.computer++;
}

// ======================
// UI
// ======================
function updateUI(player, computer, winner) {
  const winnerText = {
    player: 'Du vinner!',
    computer: 'Datorn vinner!',
    draw: 'Oavgjort!'
  };

  resultText.textContent =
    `Du valde ${player}, datorn valde ${computer}. ${winnerText[winner]}`;

  scoreText.textContent =
    `Du: ${score.player} | Dator: ${score.computer}`;
}
