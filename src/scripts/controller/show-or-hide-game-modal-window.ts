import { changeGameModalVisibility } from '../model/game-modal-visibility';

export function showOrHideGameModal(event: MouseEvent) {
    if ((event.target as HTMLDivElement).classList.contains('level')) {
        changeGameModalVisibility('1', 'visible');
    }
    if ((event.target as HTMLDivElement).classList.contains('game-view__close-btn')) {
        changeGameModalVisibility('0', 'hidden');
    }
}
