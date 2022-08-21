import { getWords } from './api/constants';
import { Tword } from './types';

const createNode = (tag: string, className: string) => {
    const item = document.createElement(tag);
    item.classList.add(className);

    return item;
};

const createCard = (data: Tword) => {
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

    example.append(exapleTitile, exampleSen, exampleTrans);

    cardText.append(title, meaning, example);

    card.append(image, cardText, voice);

    return card;
};

export const showCards = async () => {
    const main = document.querySelector('.main') as HTMLElement;
    const cardWrapper = createNode('div', 'cards-wrapper');
    const words = await getWords(0, 0);

    for (const word of words) {
        const card = createCard(word);
        cardWrapper.append(card);
    }
    main.innerHTML = null;
    main.append(cardWrapper);
};
