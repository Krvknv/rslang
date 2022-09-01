import {
    changeAudioStatus,
    checkTrueAnswer,
    displayWords,
    generateGroupOfWords,
    getWordsForGame,
    resetSprintGameData,
    sprintGameTimer,
} from '../model/sprint-game';

let sprintTimerId: NodeJS.Timer;

export async function startGame(event: MouseEvent) {
    const hash = window.location.hash.slice(1);

    if (hash === 'sprint') {
        const eventTarget = event.target as HTMLElement;

        if (eventTarget.classList.contains('level')) {
            const wordGroupNumber = eventTarget.dataset.wordGroup;
            await getWordsForGame(+wordGroupNumber);
            generateGroupOfWords();
            displayWords();
            sprintTimerId = sprintGameTimer();
        }

        if (eventTarget.classList.contains('game-view__close-btn')) {
            clearInterval(sprintTimerId);
            resetSprintGameData();
        }

        if (eventTarget.classList.contains('sprint-buttons__answer')) {
            checkTrueAnswer(eventTarget);
            displayWords();
        }

        if (eventTarget.id === 'sprint-audio-btn') {
            changeAudioStatus();
        }
    }
}
