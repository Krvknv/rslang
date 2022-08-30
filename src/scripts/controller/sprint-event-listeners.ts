import { getWordsForGame, insertWordsForGame, sprintGameTimer, wordIndexCounter } from '../model/sprint-game';

let sprintTimerId: NodeJS.Timer;

export async function startGame(event: MouseEvent) {
    const hash = window.location.hash.slice(1);

    if (hash === 'sprint') {
        const eventTarget = event.target as HTMLDivElement;

        if (eventTarget.classList.contains('level')) {
            const wordGroupNumber = eventTarget.dataset.wordGroup;
            await getWordsForGame(+wordGroupNumber);
            insertWordsForGame();
            sprintTimerId = sprintGameTimer();
        }

        if (eventTarget.classList.contains('game-view__close-btn')) {
            const [timer, placeForEnglishWord, placeForTranslateWord] = [
                document.getElementById('timer-counter'),
                document.querySelector('.sprint-questions__english-word'),
                document.querySelector('.sprint-questions__translation'),
            ];
            placeForEnglishWord.innerHTML = '';
            placeForTranslateWord.innerHTML = '';
            timer.innerHTML = '60';
            clearInterval(sprintTimerId);
            wordIndexCounter.resetValue();
        }

        if (eventTarget.classList.contains('sprint-buttons__answer')) {
            insertWordsForGame();
        }
    }
}
