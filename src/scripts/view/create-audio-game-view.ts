export const gameAudioChallengeView = () => {
    const audioChallengeView = `
    <h1 class="game-view__title">Аудиовызов</h1>
    <img class="audiochallenge__icon" src="../assets/png/bxs_volume-full.png">
    <div class="audiochallenge-answers">
        <div class="audiochallenge-answer__option" id="audiochallenge-answer-1">Duck</div>
        <div class="audiochallenge-answer__option" id="audiochallenge-answer-2">Duck</div>
        <div class="audiochallenge-answer__option" id="audiochallenge-answer-3">Duck</div>
        <div class="audiochallenge-answer__option" id="audiochallenge-answer-4">Duck</div>
    </div>
    <button class="audiochallenge__skip-btn" id="audiochallenge-skip-btn">
    Пропустить
    </button>`;

    return audioChallengeView;
};
