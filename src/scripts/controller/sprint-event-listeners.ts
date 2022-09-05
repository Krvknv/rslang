import {
    changeAudioStatus,
    checkAnswer,
    displayWords,
    generateGroupOfWords,
    getPagesForGame,
    getWordsForGame,
    resetSprintGameData,
    sprintGameTimer,
} from '../model/sprint-game';

let sprintTimerId: NodeJS.Timer;

export async function startGame(event: MouseEvent) {
    const hash = window.location.hash.slice(1);
    const eventTarget = event.target as HTMLElement;

    if (hash === 'sprint' || hash === 'textbook') {
        if (eventTarget.innerHTML === 'спринт') {
            const pages = getPagesForGame('textbook');
            const group = +localStorage.getItem('textbookGroup') - 1;
            await getWordsForGame(+group, pages, 'textbook');
            generateGroupOfWords();
            displayWords();
            sprintTimerId = sprintGameTimer();
        }

        if (eventTarget.classList.contains('level')) {
            const wordGroupNumber = eventTarget.dataset.wordGroup;
            const pages = getPagesForGame('menu');
            await getWordsForGame(+wordGroupNumber, pages, 'menu');
            generateGroupOfWords();
            displayWords();
            sprintTimerId = sprintGameTimer();
        }
    }

    if (
        eventTarget.classList.contains('game-view__close-btn') ||
        eventTarget.classList.contains('result-modal__close-btn')
    ) {
        clearInterval(sprintTimerId);
        resetSprintGameData();
    }

    if (eventTarget.classList.contains('sprint-buttons__answer')) {
        checkAnswer(eventTarget);
        displayWords();
    }

    if (eventTarget.id === 'sprint-audio-btn') {
        changeAudioStatus();
    }
}
