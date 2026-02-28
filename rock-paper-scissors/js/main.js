import { score } from './state.js';
import { getRandomChoise, determineWinner } from './game.js';
import { render } from './ui.js';

const buttons = document.querySelectorAll('[data-choice]');

buttons.forEach(button => button.addEventListener('click', handlePlayerChoise));

function handlePlayerChoise(e) {
    const player = e.currentTarget.dataset.choise;
    const computer = getRandomChoise();
    const winner = determineWinner(player, computer);

    if (winner !== 'draw'){
        score[Winner]++;
    }
    render(player, computer, winner);
}