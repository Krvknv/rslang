import { renderGameMenu, menuContent } from '../view/render-game-menu';
import { renderGameView } from '../view/render-game-modal-window';
import { registerHomePage } from './home-page';
import { registerStatistics, showStatisticsBtn } from '../view/statistics';
import { showCards } from './textbook-page';
import { addLevelListeners, nextRound, checkAnswer } from '../controller/audio-game';

function addAnswersLinsteners() {
    const answerBtns = document.querySelectorAll('.audiochallenge-answer__option');
    answerBtns.forEach((btn) => {
        btn.addEventListener('click', () => checkAnswer(btn));
    });
}

function addSkipListener() {
    const skipBtn = document.getElementById('audiochallenge-skip-btn');
    skipBtn.addEventListener('click', () => nextRound());
}

export const changePage = async () => {
    const hash = window.location.hash.slice(1);

    switch (hash) {
        case 'textbook':
            await showCards();
            break;
        case 'audiochallenge':
            renderGameMenu(menuContent.gameAudioChallenge, menuContent.gameAudioChallengeDescription);
            renderGameView(hash);
            addLevelListeners();
            addAnswersLinsteners();
            addSkipListener();
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
