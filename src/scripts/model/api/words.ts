import { loggedUser } from '../store';
import { TMarkedWord } from '../types';
import { GET_WORDS_URL, USER_WORDS_URL } from './constants';

export const getWords = async (page: number, group: number) => {
    const response = await fetch(`${GET_WORDS_URL}?page=${page}&group=${group}`);
    const jsonResponse = await response.json();

    return jsonResponse;
};

export const sendHardWord = async (wordId: string, word: TMarkedWord) => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    });
};

export const DeleteHardWord = async (wordId: string) => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const getMarkedWords = async () => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getAllWords = async () => {
    const response = await fetch(GET_WORDS_URL);
    const jsonResponse = await response.json();
    return jsonResponse;
};

export const getWord = async (wordId: string) => {
    const response = await fetch(`${GET_WORDS_URL}/${wordId}`);
    const jsonResponse = await response.json();

    return jsonResponse;
};
