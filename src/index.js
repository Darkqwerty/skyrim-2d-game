import './index.scss';
import ClientGame from './Client/ClientGame';

window.addEventListener('load', () => {
    ClientGame.init({ tagId: 'game'});
})



