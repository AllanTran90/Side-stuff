const choices = ['rock', 'paper', 'scissors'];

const winMap = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock'
};

export function getRandomChoice(){
  return choices[Math.floor(Math.random() * choices.length)];
}

export function determineWinner(player,computer) {
  if (player === computer) return 'draw';
  return winMap[player] === computer ? 'player' : 'computer';
}