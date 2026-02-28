export const score ={
    player : 0,
    computer : 0, 
};

export let gameOver = false;

export const maxWins = 3;

export function isGameOver() {
  return gameOver;
}

export function setGameOver(value) {
  gameOver = value;
}

export function resetGameState(){
    score.player = 0;
    score.computer = 0;
    gameOver = false;
}