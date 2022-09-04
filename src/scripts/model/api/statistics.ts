import { USER_WORDS_URL } from './constants';
import { GameResults } from '../types';
import { loggedUser } from '../store';

export function sendGameResults(gameResults: GameResults) {
    const { token, userId } = loggedUser;
    const url = `${USER_WORDS_URL}/${userId}/statistics`;

    fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            learnedWords: 0, // TODO взять количество изученных слов
            optional: gameResults,
        }),
    });
}
