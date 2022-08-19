const createSection = (className: string) => {
    const section = document.createElement('section');
    section.classList.add(className);

    return section;
};

const createTitle = (text: string) => {
    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = text;

    return title;
};

const createWrapper = (className: string) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add(className);

    return wrapper;
};

const createHeroText = () => {
    const text = document.createElement('p');
    text.classList.add('hero__text');
    text.textContent =
        'Приложение Lang  позволяет  учить английский язык легко и увлекательно. В приложении имеют мини-игры, которые помогают непринуждённо заниматься изучением языка, поэтому наше приложение подходит как для детей, так и для взрослых. Также  здесь вы найдете словарь, где содержатся наиболее употребляемые слова, а также статистика, где хранятся данные о вашем прогрессе.';

    return text;
};
const createHeroBg = () => {
    const background = document.createElement('div');
    background.classList.add('hero__bg');

    return background;
};

const registerHero = () => {
    const hero = createSection('hero');
    const text = createHeroText();
    const background = createHeroBg();

    hero.append(text, background);

    return hero;
};

const createAdvantageItem = (className: string, text: string) => {
    const item = document.createElement('div');
    item.classList.add(className);

    const img = document.createElement('div');
    img.classList.add('advantage__img');

    const subtitle = document.createElement('span');
    subtitle.classList.add('advantage__text');
    subtitle.textContent = text;

    item.append(img, subtitle);

    return item;
};

const registerAdvantage = () => {
    const advantage = createSection('advantage');

    const wrapper = createWrapper('advantage__wrapper');

    const title = createTitle('Приемущества');

    const progressItem = createAdvantageItem('progress', 'Отслеживание прогресса');
    const interfaceItem = createAdvantageItem('interface', 'Понятный интерфейс');
    const gameItem = createAdvantageItem('game', 'Изучение в процеесе игры');

    wrapper.append(progressItem, interfaceItem, gameItem);

    advantage.append(title, wrapper);

    return advantage;
};

const createTeamItem = (className: string, name: string, text: string) => {
    const item = document.createElement('div');
    item.classList.add(className);

    const img = document.createElement('div');
    img.classList.add('team__img');

    const title = document.createElement('span');
    title.classList.add('team__title');
    title.textContent = name;

    const subtitle = document.createElement('span');
    subtitle.classList.add('team__text');
    subtitle.textContent = text;

    item.append(img, title, subtitle);

    return item;
};

const registerTeam = () => {
    const team = createSection('team');

    const title = createTitle('О команде');

    const wrapper = createWrapper('team__wrapper');

    const victor = createTeamItem(
        'victor',
        'Виктор',
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'
    );
    const kristina = createTeamItem(
        'kristina',
        'Кристина',
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'
    );
    const evgeniy = createTeamItem(
        'evgeniy',
        'Евгений',
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'
    );

    wrapper.append(victor, kristina, evgeniy);

    team.append(title, wrapper);

    return team;
};

export const registerHomePage = () => {
    const main = document.querySelector('.main__container');
    const heroSection = registerHero();
    const advantageSectiont = registerAdvantage();
    const teamSection = registerTeam();

    main.append(heroSection, advantageSectiont, teamSection);
};
