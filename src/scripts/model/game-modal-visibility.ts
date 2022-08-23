export function changeGameModalVisibility(opacity: string, visibility: string) {
    const gameModalWindow = document.querySelector('.game-modal') as HTMLDivElement;
    gameModalWindow.style.opacity = opacity;
    gameModalWindow.style.visibility = visibility;
}
