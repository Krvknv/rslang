import { changeGroup, changePageNumber, makeSound, addHardWord, addLearntWord } from '../controller/textbook-handlers';
import { getMarkedWords, getWord, getWords } from './api/words';
import { authorization, textbook } from './store';
import { TFullWord, TMarkedWord } from './types';

const createNode = (tag: string, className: string) => {
    const item = document.createElement(tag);
    item.classList.add(className);

    return item;
};

const createTitle = () => {
    const titleBlock = createNode('div', 'block-title');

    const title = createNode('h2', 'title');
    title.textContent = 'Учебник';
    title.classList.add('textbook-title');

    const subtitle = createNode('h2', 'title');
    subtitle.textContent = 'Cтраница изучена';
    subtitle.classList.add('textbook-subtitle');

    titleBlock.append(title, subtitle);

    return titleBlock;
};

const createGroupBtn = (color: string, id: number) => {
    const button = document.createElement('button');

    button.classList.add('btn-group');
    button.id = String(id);
    button.textContent = String(id);
    button.style.backgroundColor = color;

    return button;
};

const createBlockBtns = () => {
    const buttonsWrapper = createNode('div', 'btn-wrapper');
    const colors = ['#FFB775', '#F38C8C', '#A6FE97', '#E0C2FE', '#A3FBEB', '#9BA5FF'];

    for (let i = 1; i <= 6; i++) {
        const button = createGroupBtn(colors[i - 1], i);
        buttonsWrapper.append(button);
    }
    if (authorization.logged) {
        const buttonVocabulary = createGroupBtn('#f7ce34', 7);
        buttonsWrapper.append(buttonVocabulary);
    }

    buttonsWrapper.addEventListener('click', changeGroup);

    return buttonsWrapper;
};

const createCardBtns = () => {
    const cardBtns = createNode('div', 'card__btns');

    const hardWordBtn = createNode('button', 'btn-hard-word');
    hardWordBtn.textContent = 'сложное слово';
    hardWordBtn.addEventListener('click', addHardWord);

    const learntWordBtn = createNode('button', 'btn-learnt-word');
    learntWordBtn.textContent = 'выученное слово';
    learntWordBtn.addEventListener('click', addLearntWord);

    cardBtns.append(hardWordBtn, learntWordBtn);

    return cardBtns;
};

export const prepareData = async () => {
    const words = await getWords(textbook.page - 1, textbook.group - 1);
    const markedWords = await getMarkedWords();

    words.forEach((item: TFullWord) => {
        const markedWord = markedWords.find((elem: TMarkedWord) => elem.wordId === item.id);
        if (markedWord) {
            item.difficulty = markedWord.difficulty;
        }
    });

    return words;
};

export const createCard = (data: TFullWord, difficulty?: string) => {
    const card = createNode('div', 'card');

    const image = createNode('div', 'card__img');
    image.style.backgroundImage = `url(http://localhost:3000/${data.image})`;

    const cardText = createNode('div', 'card__text');

    const title = createNode('div', 'card__title');

    const word = createNode('span', 'card__word');
    word.textContent = `${data.word} - ${data.wordTranslate}`;

    const transcription = createNode('span', 'card__transcription');
    transcription.textContent = `${data.transcription}`;

    title.append(word, transcription);

    const meaning = createNode('div', 'card__meanining');

    const meaningSen = createNode('span', 'card__meaning-sentence');
    meaningSen.innerHTML = data.textMeaning;

    const meaningTrans = createNode('span', 'card__meaning-translate');
    meaningTrans.textContent = data.textMeaningTranslate;

    meaning.append(meaningSen, meaningTrans);

    const example = createNode('div', 'card__example');

    const exapleTitile = createNode('span', 'card__example-title');
    exapleTitile.textContent = 'Example:';

    const exampleSen = createNode('span', 'card__example-sentence');
    exampleSen.innerHTML = data.textExample;

    const exampleTrans = createNode('span', 'card__example-translate');
    exampleTrans.textContent = data.textExampleTranslate;

    const voice = createNode('div', 'card__voice');
    voice.classList.add('on');
    voice.addEventListener('click', makeSound.bind(null, data.audio, data.audioMeaning, data.audioExample));

    example.append(exapleTitile, exampleSen, exampleTrans);

    cardText.append(title, meaning, example);

    const hardLabel = createNode('span', 'card__label-hard');
    const learntLabel = createNode('span', 'card__label-learnt');

    if (data.difficulty) {
        hardLabel.textContent = data.difficulty === 'hard' ? 'сложное' : '';
        learntLabel.textContent = data.difficulty === 'learnt' ? 'выучено' : '';
    }
    if (difficulty) {
        hardLabel.textContent = 'сложное';
    }

    card.append(image, cardText, voice, hardLabel, learntLabel);

    if (authorization.logged) {
        const cardBtns = createCardBtns();
        cardBtns.setAttribute('data-wordId', data.id);
        card.append(cardBtns);
    }
    return card;
};

export const createPagination = () => {
    const pagination = createNode('div', 'pagination');

    const prevBtn = createNode('button', 'prev-btn');
    prevBtn.textContent = '<';
    const nextBtn = createNode('button', 'next-btn');
    nextBtn.textContent = '>';

    const number = createNode('span', 'number');
    number.textContent = `${textbook.page}/30`;

    pagination.append(prevBtn, number, nextBtn);
    pagination.addEventListener('click', changePageNumber);

    return pagination;
};

export const updateCards = async () => {
    const cardWrapper = document.querySelector('.cards-wrapper');

    let words;
    if (authorization.logged) {
        words = await prepareData();
    } else {
        words = await getWords(textbook.page - 1, textbook.group - 1);
    }

    cardWrapper.innerHTML = null;

    for (const word of words) {
        const card = createCard(word);
        cardWrapper.append(card);
    }
};

const showFinishedPage = (value: boolean) => {
    const subtitle = document.querySelector('.textbook-subtitle') as HTMLElement;
    if (value) {
        subtitle.style.display = 'block';
    } else {
        subtitle.style.display = 'none';
    }
};

export const checkTextbookPage = async () => {
    const fullWords = await prepareData();
    let isPageFinished = true;
    if (!fullWords.length) {
        isPageFinished = false;
    }
    fullWords.forEach((item: TFullWord) => {
        if (!item.difficulty) {
            isPageFinished = false;
        }
    });

    showFinishedPage(isPageFinished);
};

export const showHardWords = async () => {
    const cardsWrapper = document.querySelector('.cards-wrapper') as HTMLElement;
    const markedWords = await getMarkedWords();
    const filteredMarkedWords = markedWords.filter((item: TMarkedWord) => item.difficulty === 'hard');

    cardsWrapper.innerHTML = null;

    filteredMarkedWords.forEach(async (item: TMarkedWord) => {
        const word = await getWord(item.wordId);
        const card = createCard(word, 'hard');
        cardsWrapper.append(card);
    });
};

export async function showVocabulary() {
    const title = document.querySelector('.textbook-title') as HTMLElement;
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const pagination = document.querySelector('.pagination') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    if (!authorization.logged) {
        title.textContent = 'Страница доступна только для авторизованных пользователей';
        cardsWrapper.innerHTML = null;
    }

    if (textbook.group === 7) {
        title.textContent = 'Сложные слова';
        pagination.style.display = 'none';
        main.style.backgroundColor = '#f7ce34';
        await showHardWords();
    }
}

export const showCards = async () => {
    const main = document.querySelector('.main') as HTMLElement;
    const title = createTitle();
    const buttonsWrapper = createBlockBtns();
    const cardsWrapper = createNode('div', 'cards-wrapper');
    const pagination = createPagination();

    main.innerHTML = null;
    main.append(title, buttonsWrapper, cardsWrapper, pagination);
    if (textbook.group === 7) {
        await showVocabulary();
        return;
    }
    let words;
    if (authorization.logged) {
        words = await prepareData();
    } else {
        words = await getWords(textbook.page - 1, textbook.group - 1);
    }

    // const words = await getWords(textbook.page - 1, textbook.group - 1);
    main.style.backgroundColor = textbook.pageColor;

    for (const word of words) {
        const card = createCard(word);
        cardsWrapper.append(card);
    }

    if (authorization.logged) {
        await checkTextbookPage();
    }
};
