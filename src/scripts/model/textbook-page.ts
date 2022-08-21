import { changeGroup, changePageNumber, makeSound } from '../controller/textbook-handlers';
import { getWords } from './api/get-words';
import { textbook } from './store';
import { Tword } from './types';

const createNode = (tag: string, className: string) => {
    const item = document.createElement(tag);
    item.classList.add(className);

    return item;
};

const createTitle = () => {
    const title = createNode('h2', 'title');
    title.textContent = 'Учебник';
    title.classList.add('textbook-title');

    return title;
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
    buttonsWrapper.addEventListener('click', changeGroup);

    return buttonsWrapper;
};

export const createCard = (data: Tword) => {
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
    voice.addEventListener('click', makeSound.bind(null, data.audio, data.audioMeaning, data.audioExample));

    example.append(exapleTitile, exampleSen, exampleTrans);

    cardText.append(title, meaning, example);

    card.append(image, cardText, voice);

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

    const words = await getWords(textbook.page - 1, textbook.group - 1);

    cardWrapper.innerHTML = null;

    for (const word of words) {
        const card = createCard(word);
        cardWrapper.append(card);
    }
};

export const showCards = async () => {
    const main = document.querySelector('.main') as HTMLElement;
    const title = createTitle();
    const buttonsWrapper = createBlockBtns();
    const cardWrapper = createNode('div', 'cards-wrapper');
    const pagination = createPagination();

    const words = await getWords(textbook.page - 1, textbook.group - 1);

    main.style.backgroundColor = textbook.pageColor;

    for (const word of words) {
        const card = createCard(word);
        cardWrapper.append(card);
    }

    main.innerHTML = null;
    main.append(title, buttonsWrapper, cardWrapper, pagination);
};
