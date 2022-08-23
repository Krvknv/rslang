export const gameSprintView = () => {
    const sprintView = `
    <h1 class="game-view__title">Спринт</h1>
    <div class="sprint-wrapper">
    <div class="score-and-timer__wrapper">
        <div class="sprint-timer circle" id="timer">
            <img src="./assets/png/stopwatch-64.png" width="35px">
            <p class="sprint-timer__counter" id="timer-counter">60</p>
        </div>
        <div class="sprint-score circle" id="score">
            <p class="sprint-score__counter" id="score-counter">0</p>
        </div>
    </div>
    <div class="counter-correct-answers">
        <div class="counter-correct-answers__circle"></div>
        <div class="counter-correct-answers__circle"></div>
        <div class="counter-correct-answers__circle"></div>
    </div>
    <div class="sprint-questions">
        <p>DUCK</p>
        <p>Утка</p>
    </div>
    </div>
    <div class="sprint-buttons">
        <button class="sprint-buttons__answer" id="sprint-false-btn">
        Неверно
        </button>
        <button class="sprint-buttons__answer" id="sprint-true-btn">
        Верно
        </button>
    </div>`;

    return sprintView;
};
