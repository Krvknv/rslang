import { renderGameMenu, menuContent } from '../view/render-game-menu';
import { renderGameView } from '../view/render-game-modal-window';
import { registerHomePage } from './home-page';
import { registerStatistics, showStatisticsBtn } from '../view/statistics';
import { showCards } from './textbook-page';
import { addAudioGameListeners } from '../controller/audio-game-add-listeners';

export const changePage = async () => {
    const hash = window.location.hash.slice(1);

    switch (hash) {
        case 'textbook':
            await showCards();
            break;
        case 'audiochallenge':
            renderGameMenu(menuContent.gameAudioChallenge, menuContent.gameAudioChallengeDescription);
            renderGameView(hash);
            addAudioGameListeners();
            break;
        case 'sprint':
            renderGameMenu(menuContent.gameSprint, menuContent.gameSprintDescription);
            renderGameView(hash);
            break;
        case 'statistics':
            showStatisticsBtn();
            registerStatistics();
            break;
        default:
            registerHomePage();
    }
};
