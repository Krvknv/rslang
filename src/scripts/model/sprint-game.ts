import { getWords } from './api/get-words';
import { Tword } from './types';

const makeCounter = () => {
    let privateCounter = 0;

    return {
        addOne() {
            privateCounter += 1;
        },
        resetValue() {
            privateCounter = 0;
        },
        getValue() {
            return privateCounter;
        },
    };
};

export const wordIndexCounter = makeCounter();

export const sprintGameTimer = () => {
    const timer = document.getElementById('timer-counter') as HTMLDivElement;
    let timeLeft = 59;
    const timeIsOver = 0;
    const timerId = setInterval(() => {
        if (timeIsOver >= timeLeft) {
            clearInterval(timerId);
        }
        timer.innerHTML = `${timeLeft}`;
        timeLeft -= 1;
    }, 1000);

    return timerId;
};

const getRandomNumber = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

const getPagesForGame = () => {
    const [firstPage, lastPage] = [0, 29];
    const currentPage = getRandomNumber(firstPage, lastPage);
    let prevPage;
    let nextPage;

    switch (currentPage) {
        case 0:
            prevPage = lastPage;
            break;

        case 29:
            nextPage = firstPage;
            break;

        default:
            prevPage = currentPage - 1;
            nextPage = currentPage + 1;
    }

    return {
        current: currentPage,
        prev: prevPage,
        next: nextPage,
    };
};

export async function getWordsForGame(groupNumber: number) {
    const pages = getPagesForGame();
    const wordsFromCurrentPage = await getWords(pages.current, groupNumber);
    const wordsFromPrevPage = await getWords(pages.prev, groupNumber);
    const wordsFromNextPage = await getWords(pages.next, groupNumber);
    const wordsForGame = [...wordsFromCurrentPage, ...wordsFromPrevPage, ...wordsFromNextPage];

    localStorage.setItem('words', JSON.stringify(wordsForGame));
}

export function generateGroupOfWords() {
    const words = JSON.parse(localStorage.getItem('words') as string);
    const wordsForGame = words.map((el: Tword) => [el.id, el.word, el.wordTranslate]);
    const translateWords = words.map((el: Tword) => el.wordTranslate);
    wordsForGame.forEach((el: Tword, i: number) => {
        const { length } = translateWords;
        const randomNumber = getRandomNumber(0, length - 1);
        const randomTranslateWord = translateWords[randomNumber];

        if (el.wordTranslate !== randomTranslateWord) {
            wordsForGame[i].push(randomTranslateWord);
            translateWords.splice(randomNumber, 1);
        }
    });

    return wordsForGame;
}

export function insertWordsForGame() {
    const placeForEnglishWord = document.querySelector('.sprint-questions__english-word') as HTMLParagraphElement;
    const placeForTranslateWord = document.querySelector('.sprint-questions__translation') as HTMLParagraphElement;
    const words = generateGroupOfWords();
    const wordIndex = wordIndexCounter.getValue();
    placeForEnglishWord.innerHTML = `${words[wordIndex][1]}`;
    placeForTranslateWord.innerHTML = words[wordIndex][getRandomNumber(2, 3)];
    wordIndexCounter.addOne();
}
