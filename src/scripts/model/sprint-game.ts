import { renderSprintGameResult } from '../view/render-sprint-game-result';
import { getWords } from './api/words';
import { changeResultModalVisibility } from './game-modal-visibility';
import { Tword } from './types';

// --------------counters--------------
const makeCounter = () => {
    let privateCounter = 0;

    return {
        incrementBy(value: number) {
            privateCounter += value;
        },
        decrementBy(value: number) {
            if (privateCounter > 0) {
                privateCounter -= value;
            }
        },
        reset() {
            privateCounter = 0;
        },
        get() {
            return privateCounter;
        },
    };
};

const wordIndexCounter = makeCounter();
const correctAnswersSeries = makeCounter();
const cupCounter = makeCounter();
const sprintScore = makeCounter();

// ---------------storages for words--------------
function makeStorageForWords() {
    const data: Tword[] = [];

    return {
        addData(value: Tword) {
            data.push(value);
        },

        reset() {
            data.length = 0;
        },

        get() {
            return data;
        },
    };
}

export const storageForCorrectAnswers = makeStorageForWords();
export const storageForWrongAnswers = makeStorageForWords();

// -------------flags-------------------
function makeFlag() {
    let flag = true;

    return {
        on() {
            flag = true;
        },

        off() {
            flag = false;
        },

        getStatus() {
            return flag;
        },
    };
}

export const soundFlag = makeFlag();

// ------------storages for numbers------------
function makeStorageForNumbers() {
    const numbers: number[] = [];

    return {
        add(series: number) {
            numbers.push(series);
        },
        reset() {
            numbers.length = 0;
        },
        get() {
            return numbers;
        },
    };
}

const storageForBestSeries = makeStorageForNumbers();

export function findDataOfWord(word: string) {
    const words = JSON.parse(localStorage.getItem('words'));
    const foundDataOfWord = words.find((dataOfWord: Tword) => dataOfWord.word === word);

    return foundDataOfWord;
}

const showGameElement = (elementIndex: number, elementListName: NodeListOf<HTMLElement>) => {
    elementListName[elementIndex].style.visibility = 'visible';
    elementListName[elementIndex].style.opacity = '1';
};

const hideGameElement = (elementListName: NodeListOf<HTMLElement>) => {
    elementListName.forEach((cup) => {
        cup.style.visibility = 'hidden';
        cup.style.opacity = '0';
    });
};

export function generateResultOfGameSprint() {
    const wrongAnswers = storageForWrongAnswers.get();
    const correctAnswers = storageForCorrectAnswers.get();
    const bestSeries = storageForBestSeries.get().sort((prevNum, nextNum) => nextNum - prevNum);
    const gameScore = sprintScore.get();
    const result = {
        gameName: 'Sprint',
        numberOfCorrectAnswers: correctAnswers.length,
        numberOfWrongAnswers: wrongAnswers.length,
        bestSeriesOfCorrectAnswer: bestSeries[0],
        score: gameScore,
        // date: ,
        // numberOfNewWords: ,
    };

    return result;
}

export const sprintGameTimer = () => {
    const timer = document.getElementById('timer-counter') as HTMLDivElement;
    let timeLeft = 59;
    const timeIsOver = 0;
    const timerId = setInterval(() => {
        if (timeIsOver >= timeLeft) {
            clearInterval(timerId);
            storageForBestSeries.add(correctAnswersSeries.get());
            // console.log(generateResultOfGameSprint());
            generateResultOfGameSprint();
            renderSprintGameResult();
            changeResultModalVisibility('1', 'visible');
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
            nextPage = currentPage + 1;
            break;

        case 29:
            nextPage = firstPage;
            prevPage = currentPage - 1;
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

    localStorage.setItem('wordsForSprintGame', JSON.stringify(wordsForGame));
}

function setDataAttributeForButtons(trueAnswer: string, falseAnswer: string) {
    const buttonTrueAnswer = document.getElementById('sprint-true-btn');
    const buttonFalseAnswer = document.getElementById('sprint-false-btn');
    buttonTrueAnswer.dataset.answer = `${trueAnswer}`;
    buttonFalseAnswer.dataset.answer = `${falseAnswer}`;
}

function insertWordsForGame(englishWord: string, translateWord: string) {
    const placeForEnglishWord = document.querySelector('.sprint-questions__english-word') as HTMLParagraphElement;
    const placeForTranslateWord = document.querySelector('.sprint-questions__translation') as HTMLParagraphElement;
    placeForEnglishWord.innerHTML = `${englishWord}`;
    placeForTranslateWord.innerHTML = `${translateWord}`;
}

export function displayWords() {
    const words = JSON.parse(localStorage.getItem('wordsForSprintGame'));
    const wordIndex = wordIndexCounter.get();

    if (wordIndex === 59) {
        wordIndexCounter.reset();
    }

    const englishWord = words[wordIndex][1];
    const randomTranslateWord = words[wordIndex][getRandomNumber(2, 3)];
    const trueTranslate = words[wordIndex][2];
    const falseTranslate = words[wordIndex][3];
    // console.log(englishWord, trueTranslate);
    insertWordsForGame(englishWord, randomTranslateWord);
    setDataAttributeForButtons(trueTranslate, falseTranslate);
    wordIndexCounter.incrementBy(1);
}

function multiplyPoints(numberOfCups: number) {
    const points = 10;
    const coefficients = [1, 2, 4, 8];

    switch (numberOfCups) {
        case 1:
            return points * coefficients[1];
        case 2:
            return points * coefficients[2];
        case 3:
            return points * coefficients[3];
        default:
            return points * coefficients[0];
    }
}

export const changeAudioButtonStyle = (action: string) => {
    const audioButton = document.getElementById('sprint-audio-btn');
    audioButton.innerHTML = `<img id="sprint-audio-btn" src="./assets/png/volume-${action}.png" width="25px">`;
};

export function playSound(answer: string) {
    const answerSound = new Audio(`../assets/audio/${answer}_answer.mp3`);
    const flag = soundFlag.getStatus();

    switch (flag) {
        case true:
            answerSound.volume = 1;
            answerSound.play();
            break;
        default:
            answerSound.volume = 0;
    }
}

export function changeAudioStatus() {
    const flag = soundFlag.getStatus();
    switch (flag) {
        case true:
            changeAudioButtonStyle('off');
            soundFlag.off();
            break;
        default:
            changeAudioButtonStyle('on');
            soundFlag.on();
    }
}

function changeStyleAndScoreByAnswer(seriesOfCorrectAnswers: number) {
    const checkCircles = document.querySelectorAll('.counter-correct-answers__circle') as NodeListOf<HTMLDivElement>;
    const gameScore = document.getElementById('score-counter') as HTMLDivElement;
    const cups = document.querySelectorAll('.cup') as NodeListOf<HTMLDivElement>;
    const placeForPoints = document.getElementById('points-counter');
    let cupIndex = cupCounter.get();
    let pointsByTrueAnswer = multiplyPoints(cupIndex);

    if (seriesOfCorrectAnswers === 0) {
        hideGameElement(cups);
        hideGameElement(checkCircles);
        cupCounter.reset();
        cupIndex = cupCounter.get();
        pointsByTrueAnswer = multiplyPoints(cupIndex);
        placeForPoints.innerHTML = `+${pointsByTrueAnswer} очков за слово`;
        return;
    }

    if (seriesOfCorrectAnswers % 4 === 0 && seriesOfCorrectAnswers < 16) {
        if (cupIndex < 3) {
            showGameElement(cupIndex, cups);
        }

        hideGameElement(checkCircles);
        cupCounter.incrementBy(1);
        cupIndex = cupCounter.get();
        pointsByTrueAnswer = multiplyPoints(cupIndex);
        placeForPoints.innerHTML = `+${pointsByTrueAnswer} очков за слово`;
        sprintScore.incrementBy(pointsByTrueAnswer);
        gameScore.innerHTML = `${sprintScore.get()}`;

        return;
    }

    for (let i = 0; i < seriesOfCorrectAnswers % 4; i++) {
        showGameElement(i, checkCircles);
    }
    sprintScore.incrementBy(pointsByTrueAnswer);
    placeForPoints.innerHTML = `+${pointsByTrueAnswer} очков за слово`;
    gameScore.innerHTML = `${sprintScore.get()}`;
}

export function checkAnswer(answerButton: HTMLElement) {
    const placeForTranslateWord = document.querySelector('.sprint-questions__translation') as HTMLParagraphElement;
    const word = document.querySelector('.sprint-questions__english-word').innerHTML;

    if (answerButton.dataset.answer === placeForTranslateWord.innerHTML) {
        playSound('true');
        correctAnswersSeries.incrementBy(1);
        storageForCorrectAnswers.addData(findDataOfWord(word));
    } else {
        playSound('false');
        storageForBestSeries.add(correctAnswersSeries.get());
        correctAnswersSeries.reset();
        storageForWrongAnswers.addData(findDataOfWord(word));
    }
    changeStyleAndScoreByAnswer(correctAnswersSeries.get());
}

const resetCounters = () => {
    const counters = [wordIndexCounter, sprintScore, cupCounter, correctAnswersSeries];
    counters.forEach((counter) => counter.reset());
};

const resetStorages = () => {
    const storages = [storageForCorrectAnswers, storageForWrongAnswers, storageForBestSeries];

    storages.forEach((storage) => storage.reset());
};

const resetBlockContent = () => {
    const [timer, placeForEnglishWord, placeForTranslateWord, gameScore, placeForPoints] = [
        document.getElementById('timer-counter'),
        document.querySelector('.sprint-questions__english-word'),
        document.querySelector('.sprint-questions__translation'),
        document.getElementById('score-counter'),
        document.getElementById('points-counter'),
    ];

    const blocks = [timer, placeForEnglishWord, placeForTranslateWord, gameScore, placeForPoints];
    const blockContent = ['', '', '60', '0', '+10 очков за слово'];

    blocks.forEach((block, i) => (block.innerHTML = blockContent[i]));
};

const hideGameElements = () => {
    const cups = document.querySelectorAll('.cup') as NodeListOf<HTMLDivElement>;
    const checkCircles = document.querySelectorAll('.counter-correct-answers__circle') as NodeListOf<HTMLDivElement>;

    const gameElements = [cups, checkCircles];
    gameElements.forEach((gameElement) => hideGameElement(gameElement));
};

export function resetSprintGameData() {
    resetCounters();
    resetBlockContent();
    resetStorages();
    hideGameElements();
    soundFlag.on();
}
