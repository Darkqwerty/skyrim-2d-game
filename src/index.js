import './index.scss';
import ClientGame from './Client/ClientGame';

const $putYourName = document.querySelector('.start-game');
const $form = document.querySelector('form#nameForm');
const $nameInput = document.querySelector('input#name');
let playerName = '';

window.addEventListener('load', () => {
    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        playerName = $nameInput.value;

        if (playerName) {
            $putYourName.remove();
            ClientGame.init({ tagId: 'game', playerName: playerName });
        }
    });
})



