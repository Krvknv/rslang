export const menuContent = {
    gameSprint: 'Спринт',
    gameSprintDescription: 'Выберите соответсвует ли перевод предложенному слову',
    gameAudioChallenge: 'Аудиовызов',
    gameAudioChallengeDescription:
        'Выберите из предложенных вариантов ответа правильный перевод слова, который услышите',
    levelColors: ['#FFB775', '#F38C8C', '#A6FE97', '#E0C2FE', '#A3FBEB', '#9BA5FF'],
};

function renderLevelList() {
    const levelList = `<ul class="levels-list">
    ${menuContent.levelColors
        .map(
            (levelColor, index) => `<li class="levels-list__item">
             <div style="background-color:${levelColor};">${index + 1}</div>
         </li>`
        )
        .join(' ')}
    </ul>`;

    return levelList;
}

export function renderGameMenu(gameName: string, gameDescription: string) {
    const mainContainer = document.querySelector('.main__container');
    const footer = document.querySelector('.footer') as HTMLElement;
    mainContainer.innerHTML = `
    <div class="game-menu">
        <h1 class="game-menu__title">${gameName}</h1>
        <h3 class="game-menu__description">${gameDescription}</h3>
        <div class="game-menu__levels">
            ${renderLevelList()}
        </div>
    </div>`;

    footer.style.display = 'none';
}
