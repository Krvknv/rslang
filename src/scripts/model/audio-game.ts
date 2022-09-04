import { Tword } from './types';
import { COMMON_URL } from './api/constants';
import { changeResultModalVisibility } from './game-modal-visibility';

class AudioGame {
    words: Array<Tword>;

    stats: Array<{
        word: string;
        result: boolean;
    }>;

    wordIndex: number;

    wordsArray: Array<string>;

    streak: number;

    longestStreak: number;

    rightAnswers: number;

    constructor(words: Array<Tword>) {
        this.words = words;
        this.wordIndex = 0;
        this.stats = [];
        this.wordsArray = [];
        this.streak = 0;
        this.longestStreak = 0;
        this.rightAnswers = 0;

        this.words.forEach((word) => {
            this.wordsArray.push(word.word);
        });
    }

    updateStreak() {
        this.streak++;

        if (this.longestStreak < this.streak) this.longestStreak = this.streak;
    }

    getAnswerVariants(word: string) {
        const arr = [word];

        while (arr.length < 4) {
            const index = Math.round(Math.random() * (this.words.length - 1));
            if (!arr.includes(this.wordsArray[index])) {
                arr.push(this.wordsArray[index]);
            }
        }

        return arr.sort(() => Math.random() - 0.5);
    }

    updateStats(word: string, result: boolean) {
        this.stats.push({
            word,
            result,
        });
    }
}

let wordsArray: Array<Tword> = [];
let game: AudioGame;

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
    audioIcon.addEventListener('click', () => audioElement.play());

    const answerVariants = game.getAnswerVariants(word.word);
    const answerOptionBtns = document.querySelectorAll('.audiochallenge-answer__option');
    let index = 0;
    answerOptionBtns.forEach((btn) => {
        btn.innerHTML = answerVariants[index++];
    });
}

function renderAudioGameResults() {
    changeResultModalVisibility('1', 'visible');
    const resultModalWindow = document.querySelector('.result-modal__window') as HTMLDivElement;
    const gameWrapper = document.querySelector('.audiochallenge__wrapper') as HTMLElement;
    gameWrapper.style.display = 'none';

    resultModalWindow.innerHTML = `
    <div>Результаты игры:</div>
    <table id="game-view__results-list">
    </table>
    `;

    const resultsList = document.getElementById('game-view__results-list');
    let index = 1;

    game.stats.forEach((stat) => {
        resultsList.innerHTML += `
        <tr>
            <td>${index++}</td>
            <td>${stat.word.toUpperCase()}</td>
            <td>${stat.result ? 'правильно' : 'ошибка'}</td>
        </tr>
        `;
    });
}

export function nextRound() {
    if (game.wordIndex < game.words.length - 1) {
        game.wordIndex++;
        updateGameView(game.words[game.wordIndex]);
    } else {
        renderAudioGameResults();
    }
}

export function checkAnswer(btn: Element) {
    const result = btn.innerHTML === game.words[game.wordIndex].word;
    if (result) {
        console.log('Right!');
        game.rightAnswers++;
        game.updateStreak();
    } else {
        console.log('Wrong!');
        game.streak = 0;
    }
    console.log(game.streak, game.longestStreak);
    const word = game.words[game.wordIndex].word as string;

    game.updateStats(word, result);
    nextRound();
}

export function skipAnswer() {
    game.streak = 0;
    const word = game.words[game.wordIndex].word as string;
    game.updateStats(word, false);
    nextRound();
}

export function startAudioGame(words: Array<Tword>): void {
    wordsArray = randomizeWords(words);
    game = new AudioGame(wordsArray);
    cacheAudio(game.words);
    updateGameView(game.words[game.wordIndex]);
}
