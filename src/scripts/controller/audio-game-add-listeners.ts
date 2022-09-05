import { checkAudioAnswer, skipAnswer, startAudioGame } from '../model/audio-game';
import { getWords } from '../model/api/words';

function addLevelListeners(): void {
    const levelBtns = document.querySelectorAll('.level');
    levelBtns.forEach((btn) => {
        (btn as HTMLElement).addEventListener('click', () => {
            const level = parseInt(btn.innerHTML, 10) - 1;
            const page = Math.ceil(Math.random() * 5);
            getWords(page, level).then((words) => {
                startAudioGame(words);
            });
        });
    });
}

function addAnswersLinsteners(): void {
    const answerBtns = document.querySelectorAll('.audiochallenge-answer__option');
    answerBtns.forEach((btn) => {
        btn.addEventListener('click', () => checkAudioAnswer(btn));
    });
}

function addSkipListener(): void {
    const skipBtn = document.getElementById('audiochallenge-skip-btn');
    skipBtn.addEventListener('click', () => skipAnswer());
}

export function addAudioGameListeners(): void {
    addAnswersLinsteners();
    addSkipListener();
    addLevelListeners();
}
