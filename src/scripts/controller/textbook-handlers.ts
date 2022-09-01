import { DeleteHardWord, sendHardWord } from '../model/api/words';
import { getDate } from '../model/get-date';
import { authorization, textbook } from '../model/store';
import { checkTextbookPage, showVocabulary, updateCards } from '../model/textbook-page';

export const changeGroup = async (event: Event) => {
    const node = event.target as HTMLButtonElement;
    const title = document.querySelector('.textbook-title') as HTMLElement;
    const pagination = document.querySelector('.pagination') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    const number = document.querySelector('.number');
    const groupNum = node.id;
    const pageColor = node.style.backgroundColor;
    if (node.classList.contains('btn-group')) {
        textbook.group = +groupNum;

        main.style.backgroundColor = pageColor;

        localStorage.setItem('textbookGroup', groupNum);
        localStorage.setItem('textbookPageColor', pageColor);

        if (textbook.group === 7) {
            await showVocabulary();
        } else {
            title.textContent = 'Учебник';
            pagination.style.display = 'flex';
            localStorage.setItem('textbookPage', '1');

            textbook.page = 1;
            number.textContent = `${textbook.page}/30`;
            await updateCards();
            if (authorization.user) {
                await checkTextbookPage();
            }
        }
    }
};

const showPrevPage = async () => {
    if (textbook.page > 1) {
        const number = document.querySelector('.number');

        textbook.page -= 1;
        number.textContent = `${textbook.page}/30`;
        localStorage.setItem('textbookPage', `${textbook.page}`);

        updateCards();
    }
};
const showNextPage = async () => {
    if (textbook.page < 30) {
        const number = document.querySelector('.number');

        textbook.page += 1;
        number.textContent = `${textbook.page}/30`;
        localStorage.setItem('textbookPage', `${textbook.page}`);

        updateCards();
    }
};

export const changePageNumber = async (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.classList.contains('prev-btn')) {
        showPrevPage();
    }
    if (node.classList.contains('next-btn')) {
        showNextPage();
    }
    if (authorization.user) {
        await checkTextbookPage();
    }
};

export const makeSound = (...arg: [string, string, string, Event]) => {
    let list = arg.slice(0, 3);
    const audioElements: HTMLAudioElement[] = [];

    if (textbook.audio.length > 0) {
        for (let i = 0; i < 3; i++) {
            textbook.audio[i].pause();
        }
        textbook.audio = textbook.audio.slice(3);
    }
    for (let i = 0; i < list.length; i++) {
        const audio = new Audio(`http://localhost:3000/${list[i]}`);
        textbook.audio.push(audio);
        audioElements.push(audio);

        if (i === 0) {
            // Первое аудио запускаем
            audioElements[i].play();
        } else {
            // Остальные — после окончания предыдущего
            audioElements[i - 1].addEventListener('ended', function () {
                audioElements[i].play();

                list = list.slice(1);
            });
        }
    }
};

export const addLearntWord = async (event: Event) => {
    const node = event.target as HTMLButtonElement;
    const cardLabel = node.parentNode.previousSibling;
    const cardhardLabel = cardLabel.previousSibling;
    const wordId = (node.parentNode as HTMLElement).dataset.wordid;
    const date = getDate();
    if (cardhardLabel.textContent && textbook.group === 7) {
        await DeleteHardWord(wordId);
        await sendHardWord(wordId, { difficulty: 'learnt', optional: { date } });
        await showVocabulary();
        return;
    }
    if (cardhardLabel.textContent) {
        await DeleteHardWord(wordId);
        await sendHardWord(wordId, { difficulty: 'learnt', optional: { date } });
        cardhardLabel.textContent = '';
        await checkTextbookPage();
        return;
    }
    if (cardLabel.textContent === 'выучено') {
        cardLabel.textContent = '';
        await DeleteHardWord(wordId);
    } else {
        cardLabel.textContent = 'выучено';
        await sendHardWord(wordId, { difficulty: 'learnt', optional: { date } });
    }
    await checkTextbookPage();
};

export const addHardWord = async (event: Event) => {
    const node = event.target as HTMLButtonElement;
    const cardLabel = node.parentNode.previousSibling.previousSibling;
    const cardLearntLabel = node.parentNode.previousSibling;
    const wordId = (node.parentNode as HTMLElement).dataset.wordid;
    if (cardLearntLabel.textContent) {
        await DeleteHardWord(wordId);
        await sendHardWord(wordId, { difficulty: 'hard', optional: {} });
        cardLearntLabel.textContent = '';
        cardLabel.textContent = 'сложное';
        await checkTextbookPage();
        return;
    }

    if (cardLabel.textContent === 'сложное' && textbook.group === 7) {
        cardLabel.textContent = '';
        await DeleteHardWord(wordId);
        await showVocabulary();
        return;
    }
    if (cardLabel.textContent === 'сложное') {
        cardLabel.textContent = '';
        await DeleteHardWord(wordId);
    } else {
        cardLabel.textContent = 'сложное';
        await sendHardWord(wordId, { difficulty: 'hard', optional: {} });
    }
    await checkTextbookPage();
};
