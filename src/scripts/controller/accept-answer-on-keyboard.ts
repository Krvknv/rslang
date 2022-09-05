import { checkAnswer, displayWords } from '../model/sprint-game';
import { checkAudioAnswer, skipAnswer } from '../model/audio-game';

export function acceptAnswersOnKeyboard(event: KeyboardEvent) {
    const hash = window.location.hash.slice(1);
    const falseButton = document.getElementById('sprint-false-btn');
    const trueButton = document.getElementById('sprint-true-btn');

    if (hash === 'sprint') {
        if (event.code === 'ArrowRight') {
            checkAnswer(trueButton);
            displayWords();
        } else if (event.code === 'ArrowLeft') {
            checkAnswer(falseButton);
            displayWords();
        }
    }

    if (hash === 'audiochallenge') {
        const answerBtns = document.querySelectorAll('.audiochallenge-answer__option');

        switch (event.code) {
            case 'Space':
                skipAnswer();
                break;
            case 'Digit1':
                checkAudioAnswer(answerBtns[0]);
                break;
            case 'Digit2':
                checkAudioAnswer(answerBtns[1]);
                break;
            case 'Digit3':
                checkAudioAnswer(answerBtns[2]);
                break;
            case 'Digit4':
                checkAudioAnswer(answerBtns[3]);
                break;
            default:
                break;
        }
    }
}
