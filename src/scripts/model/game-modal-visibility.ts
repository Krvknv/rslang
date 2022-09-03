export function changeGameModalVisibility(opacity: string, visibility: string) {
    const gameModalWindow = document.querySelector('.game-modal') as HTMLDivElement;
    gameModalWindow.style.opacity = opacity;
    gameModalWindow.style.visibility = visibility;
}

export function changeResultModalVisibility(opacity: string, visibility: string) {
    const resultModalWindow = document.querySelector('.result-modal') as HTMLDivElement;
    resultModalWindow.style.opacity = opacity;
    resultModalWindow.style.visibility = visibility;
}
