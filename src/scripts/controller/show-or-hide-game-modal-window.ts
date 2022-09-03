import { changeGameModalVisibility, changeResultModalVisibility } from '../model/game-modal-visibility';

export function showOrHideGameModal(event: MouseEvent) {
    if ((event.target as HTMLDivElement).classList.contains('level')) {
        changeGameModalVisibility('1', 'visible');
    }

    if ((event.target as HTMLDivElement).classList.contains('game-view__close-btn')) {
        changeGameModalVisibility('0', 'hidden');
        changeResultModalVisibility('0', 'hidden');
    }

    if ((event.target as HTMLDivElement).classList.contains('result-modal__close-btn')) {
        changeGameModalVisibility('0', 'hidden');
        changeResultModalVisibility('0', 'hidden');
    }
}
