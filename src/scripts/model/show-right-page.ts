import { renderGameMenu, menuContent } from '../view/render-game-menu';
import { registerHomePage } from './home-page';

export const changePage = () => {
    const hash = window.location.hash.slice(1);

    switch (hash) {
        case 'textbook':
            break;
        case 'audiochallenge':
            renderGameMenu(menuContent.gameAudioChallenge, menuContent.gameAudioChallengeDescription);
            break;
        case 'sprint':
            renderGameMenu(menuContent.gameSprint, menuContent.gameSprintDescription);
            break;
        case 'statistics':
            break;
        default:
            registerHomePage();
    }
};
