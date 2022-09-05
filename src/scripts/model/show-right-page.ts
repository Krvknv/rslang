import { renderGameMenu, menuContent } from '../view/render-game-menu';
import { renderGameView } from '../view/render-game-modal-window';
import { registerHomePage } from './home-page';
import { registerStatistics, showStatisticsBtn } from '../view/statistics';
import { showCards } from './textbook-page';
import { addAudioGameListeners } from '../controller/audio-game-add-listeners';
import { changeGameModalVisibility } from './game-modal-visibility';

export const changePage = async () => {
    const hash = window.location.hash.slice(1);
    const pageName = localStorage.getItem('pageName');

    switch (hash) {
        case 'textbook':
            localStorage.setItem('pageName', 'textbook');
            await showCards();
            break;
        case 'audiochallenge':
            // if (pageName === 'textbook') {
            //     renderGameView(hash);
            //     changeGameModalVisibility('1', 'visible');
            //     document.location.hash = 'homepage';
            //     registerHomePage();
            // } else {
            renderGameMenu(menuContent.gameAudioChallenge, menuContent.gameAudioChallengeDescription);
            renderGameView(hash);
            // }
            addAudioGameListeners();
            break;
        case 'sprint':
            if (pageName === 'textbook') {
                renderGameView(hash);
                changeGameModalVisibility('1', 'visible');
                document.location.hash = 'homepage';
                registerHomePage();
            } else {
                renderGameMenu(menuContent.gameSprint, menuContent.gameSprintDescription);
                renderGameView(hash);
            }
            break;
        case 'statistics':
            localStorage.setItem('pageName', 'statistics');
            showStatisticsBtn();
            registerStatistics();
            break;
        default:
            localStorage.setItem('pageName', 'homepage');
            registerHomePage();
    }
};
