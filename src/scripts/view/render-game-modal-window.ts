import { gameAudioChallengeView } from './create-audio-game-view';
import { gameSprintView } from './create-sprint-game-view';

export function createGameView(game: string) {
    const gameView = `
        <div class="game-view ${game}">
            <button class="game-view__close-btn"></button>
            ${game === 'sprint' ? gameSprintView() : gameAudioChallengeView()}
        </div>`;

    return gameView;
}

export function renderGameView(game: string) {
    const gameModal = document.querySelector('.game-modal') as HTMLDivElement;
    gameModal.innerHTML = createGameView(game);
}
