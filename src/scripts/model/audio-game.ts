import { Tword, GameResults } from './types';
import { COMMON_URL } from './api/constants';
import { changeResultModalVisibility } from './game-modal-visibility';
import { getDate } from './get-date';
import { sendGameResults } from './api/statistics';
import { getUserWord, createUserWord, updateUserWord } from './api/words';

class AudioGame {
    words: Array<Tword>;

    stats: Array<{
        word: string;
        translation: string;
        result: boolean;
    }>;

    wordIndex: number;

    wordsArray: Array<string>;

    streak: number;

    longestStreak: number;

    rightAnswers: number;

    newWords: number;

    constructor(words: Array<Tword>) {
        this.words = words;
        this.wordIndex = 0;
        this.stats = [];
        this.wordsArray = [];
        this.streak = 0;
        this.longestStreak = 0;
        this.rightAnswers = 0;
        this.newWords = 0;

        this.words.forEach((word) => {
            this.wordsArray.push(word.word);
        });
    }

    updateStreak() {
        this.streak++;

        if (this.longestStreak < this.streak) this.longestStreak = this.streak;
    }

    getAnswerVariants(word: { eng: string; ru: string }) {
        const arr = [word];

        while (arr.length < 4) {
            const index = Math.round(Math.random() * (this.words.length - 1));
            if (!arr.filter((element) => element.eng === this.words[index].word).length) {
                arr.push({ eng: this.words[index].word, ru: this.words[index].wordTranslate });
            }
        }

        return arr.sort(() => Math.random() - 0.5);
    }

    updateStats(word: string, translation: string, result: boolean) {
        this.stats.push({
            word,
            translation,
            result,
        });
    }

    getRightAnswersCount() {
        return this.stats.filter((stat) => stat.result).length;
    }

    getWrongAnswersCount() {
        return this.stats.filter((stat) => !stat.result).length;
    }

    generateResults(): GameResults {
        return {
            gameName: 'Audiochallenge',
            numberOfCorrectAnswers: this.getRightAnswersCount(),
            numberOfWrongAnswers: this.getWrongAnswersCount(),
            bestSeriesOfCorrectAnswer: this.longestStreak,
            score: 0,
            date: getDate(),
            numberOfNewWords: this.newWords,
        };
    }
}

let wordsArray: Array<Tword> = [];
let game: AudioGame;

export function isGameFinished() {
    return game.stats.length >= game.wordsArray.length;
}

function randomizeWords(words: Array<Tword>): Array<Tword> {
    return words.sort(() => Math.random() - 0.5);
}

function cacheAudio(words: Array<Tword>) {
    const audioElement = new Audio();
    words.forEach((word) => {
        audioElement.src = `${COMMON_URL}${word.audio}`;
    });
}

function updateGameView(word: Tword): void {
    const resultModalWindow = document.querySelector('.result-modal__window') as HTMLDivElement;
    resultModalWindow.innerHTML = '';

    const gameWrapper = document.querySelector('.audiochallenge__wrapper') as HTMLElement;
    gameWrapper.style.display = 'flex';

    const audioIcon = document.querySelector('.audiochallenge__icon');
    const audioElement = document.getElementById('audiochallenge__audio') as HTMLAudioElement;
    audioElement.src = `${COMMON_URL}${word.audio}`;
    audioElement.play();
    audioIcon.addEventListener('click', () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
    });

    const answerVariants = game.getAnswerVariants({ eng: word.word, ru: word.wordTranslate });
    const answerOptionBtns = document.querySelectorAll('.audiochallenge-answer__option');
    let index = 0;
    answerOptionBtns.forEach((btn) => {
        (btn as HTMLElement).dataset.word = answerVariants[index].eng;
        btn.innerHTML = answerVariants[index].ru;
        index++;
    });
}

function renderAudioGameResults() {
    changeResultModalVisibility('1', 'visible');
    const resultModalWindow = document.querySelector('.result-modal__window') as HTMLDivElement;
    const gameWrapper = document.querySelector('.audiochallenge__wrapper') as HTMLElement;
    gameWrapper.style.display = 'none';

    resultModalWindow.innerHTML = `
    <div>Результаты игры:</div>
    <div>Новых слов: ${game.newWords}</div>
    <table class="audiochallenge__results" id="game-view__results-list">
    </table>
    `;

    const resultsList = document.getElementById('game-view__results-list');
    let index = 1;

    game.stats.forEach((stat) => {
        const tableRow = `
            <td>${index++}</td>
            <td>${stat.word}</td>
            <td>${stat.translation}</td>
            <td>${stat.result ? '✔️' : '❌'}</td>
        `;
        resultsList.innerHTML +=
            index % 2 === 0
                ? `<tr class="audiochallenge__results__row_grey">${tableRow}</tr>`
                : `<tr">${tableRow}</tr>`;
    });
}

export function nextRound() {
    if (game.wordIndex < game.words.length - 1) {
        game.wordIndex++;
        updateGameView(game.words[game.wordIndex]);
    } else {
        renderAudioGameResults();
        const gameResults = game.generateResults();
        sendGameResults(gameResults);
    }
}

function highlighRightAnswer() {
    const answerBtns = document.querySelectorAll('.audiochallenge-answer__option');
    answerBtns.forEach((btn) => {
        if ((btn as HTMLElement).dataset.word === game.words[game.wordIndex].word) {
            btn.classList.add('audiochallenge-answer__option_right');
        }
    });
}

function resetAnswersHighlight() {
    const answerBtns = document.querySelectorAll('.audiochallenge-answer__option');
    answerBtns.forEach((btn) => {
        btn.classList.remove('audiochallenge-answer__option_right');
    });
}

function updateWordStatus(word: Tword, answerResult: boolean) {
    const wordId = word.id;
    getUserWord(wordId).then(
        (res) => {
            res.optional.count++;
            res.optional.correctAnswer += answerResult ? 1 : 0;
            res.optional.wrongAnswer += !answerResult ? 1 : 0;

            const responseWord = {
                difficulty: res.difficulty,
                optional: {
                    count: res.count,
                    correctAnswer: res.correctAnswer,
                    wrongAnswer: res.wrongAnswer,
                },
            };
            updateUserWord(res.wordId, responseWord).then(() => {
                nextRound();
            });
        },
        () => {
            game.newWords += 1;
            createUserWord(wordId, {
                difficulty: 'medium',
                optional: {
                    count: 1,
                    correctAnswer: answerResult ? 1 : 0,
                    wrongAnswer: !answerResult ? 1 : 0,
                },
            }).then(() => {
                nextRound();
            });
        }
    );
}

export function checkAudioAnswer(btn: Element) {
    const result = (btn as HTMLElement).dataset.word === game.words[game.wordIndex].word;
    if (result) {
        game.rightAnswers++;
        game.updateStreak();
    } else {
        game.streak = 0;
    }
    const word = game.words[game.wordIndex].word as string;
    const translation = game.words[game.wordIndex].wordTranslate as string;

    game.updateStats(word, translation, result);
    highlighRightAnswer();
    setTimeout(() => {
        updateWordStatus(game.words[game.wordIndex], result);
        resetAnswersHighlight();
    }, 500);
}

export function skipAnswer() {
    game.streak = 0;
    const word = game.words[game.wordIndex].word as string;
    const translation = game.words[game.wordIndex].wordTranslate as string;
    game.updateStats(word, translation, false);
    updateWordStatus(game.words[game.wordIndex], false);
}

export function startAudioGame(words: Array<Tword>): void {
    wordsArray = randomizeWords(words);
    game = new AudioGame(wordsArray);
    cacheAudio(game.words);
    updateGameView(game.words[game.wordIndex]);
}
