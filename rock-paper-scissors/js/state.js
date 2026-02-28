export const score ={
    player : 0,
    computer : 0, 
};

export let gameOver = false;

export const maxWins = 3;

export function resetGameState(){
    score.player = 0;
    score.computer = 0;
    gameOver = false;
}