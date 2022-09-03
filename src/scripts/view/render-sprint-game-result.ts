import { generateResultOfGameSprint, storageForCorrectAnswers, storageForWrongAnswers } from '../model/sprint-game';

export function renderSprintGameResult() {
    const resultModalWindow = document.querySelector('.result-modal__window') as HTMLDivElement;
    const wrongAnswers = storageForWrongAnswers.get();
    const correctAnswers = storageForCorrectAnswers.get();
    const gameResult = generateResultOfGameSprint();

    resultModalWindow.innerHTML = `
    <button class="result-modal__close-btn"></button>
    <div class="score-and-series-wrapper">
        <div class="result-modal__score">Счёт: ${gameResult.score}</div>
        <div class="result-modal__best-series">Лучшая серия ответов: ${gameResult.bestSeriesOfCorrectAnswer}</div>
    </div>
    <div class="result-modal__content-wrapper">
        <div class="answers wrong-answers">
            <h4>Неправильные ответы: ${gameResult.numberOfWrongAnswers}</h4>
            <ul>
                ${wrongAnswers.map(({ word, wordTranslate }) => `<li>${word} - ${wordTranslate}</li>`).join(' ')}
            </ul>
        </div>
        <div class="answers correct-answers">
            <h4>Правильные ответы:  ${correctAnswers.length}</h4>
            <ul>
                ${correctAnswers.map(({ word, wordTranslate }) => `<li>${word} - ${wordTranslate}</li>`).join(' ')}
            </ul>
        </div>
    </div>`;
}
