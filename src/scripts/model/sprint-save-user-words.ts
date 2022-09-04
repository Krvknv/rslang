import { getWordStatus, createUserWord, getUserWord, updateUserWord } from './api/words';
import { newWordsCounter } from './sprint-game';
import { Tword, TUserWord } from './types';

function createNewOptionalObject(difficulty: string) {
    const newOptionalObject = {
        difficulty: `${difficulty}`,
        optional: {
            count: 1,
            correctAnswer: 0,
            wrongAnswer: 0,
        },
    };

    return newOptionalObject;
}

function countCorrectOrIncorrectAnswer(word: TUserWord, answer: string) {
    if (answer === 'true') {
        word.optional.correctAnswer = +word.optional.correctAnswer + 1;
        return word.optional.correctAnswer;
    } else {
        word.optional.wrongAnswer = +word.optional.wrongAnswer + 1;
        return word.optional.wrongAnswer;
    }
}

function checkPercentageOfCorrectAnswers(word: TUserWord) {
    const percentageOfCorrectAnswers = (word.optional.correctAnswer / word.optional.count) * 100;

    return percentageOfCorrectAnswers;
}

function changeDifficulty(word: TUserWord, answer: string) {
    const numberOfCorrectAnswers = word.optional.correctAnswer;
    const percentageOfCorrectAnswers = checkPercentageOfCorrectAnswers(word);

    switch (word.difficulty) {
        case 'hard':
            if (answer === 'true' && numberOfCorrectAnswers > 5 && percentageOfCorrectAnswers > 85) {
                word.difficulty = 'learnt';
            } else {
                word.difficulty = 'hard';
            }
            break;

        case 'medium':
            if (answer === 'true' && numberOfCorrectAnswers > 3 && percentageOfCorrectAnswers > 75) {
                word.difficulty = 'learnt';
            } else {
                word.difficulty = 'medium';
            }
            break;

        case 'learnt':
            if (answer === 'true') {
                word.difficulty = 'learnt';
            } else {
                word.difficulty = 'medium';
            }
            break;

        default:
    }
}

export async function createOrUpdateWordsForUser(word: Tword, answer: string) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const status = await getWordStatus(word.id);

        if (status === 404) {
            newWordsCounter.incrementBy(1);
            const wordInfo = createNewOptionalObject('medium');
            countCorrectOrIncorrectAnswer(wordInfo, answer);
            await createUserWord(word.id, wordInfo);
            return;
        }

        const userWord: TUserWord = await getUserWord(word.id);
        delete userWord.id;
        delete userWord.wordId;

        switch (userWord.difficulty) {
            case 'medium':
                userWord.optional.count = +userWord.optional.count + 1;
                countCorrectOrIncorrectAnswer(userWord, answer);
                changeDifficulty(userWord, answer);
                await updateUserWord(word.id, userWord);
                break;

            case 'hard':
                if (userWord.optional === undefined) {
                    const wordInfo = createNewOptionalObject('hard');
                    countCorrectOrIncorrectAnswer(wordInfo, answer);
                    changeDifficulty(wordInfo, answer);
                    await updateUserWord(word.id, wordInfo);
                } else {
                    userWord.optional.count = +userWord.optional.count + 1;
                    countCorrectOrIncorrectAnswer(userWord, answer);
                    changeDifficulty(userWord, answer);
                    await updateUserWord(word.id, userWord);
                }
                break;

            case 'learnt':
                userWord.optional.count = +userWord.optional.count + 1;
                countCorrectOrIncorrectAnswer(userWord, answer);
                changeDifficulty(userWord, answer);
                await updateUserWord(word.id, userWord);
                break;

            default:
        }
    }
}
