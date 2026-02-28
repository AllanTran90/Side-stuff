import { score } from './state.js';

const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');

const winnerText = {
    player: 'You Win',
    computer: 'You lost',
    draw: 'Draw!'
};

export function render(player, computer, winner){
    resultText.textContent = `You Choose ${player}, Computer Choose ${computer}. ${winnerText[winner]}`;

    scoreText.textContent =
        `You: ${score.player} | Computer: ${score.computer}`;
}