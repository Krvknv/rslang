import { loggedUser } from '../store';
import { TMarkedWord, TUserWord } from '../types';
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

// -----------------USERS WORDS----------------------------

export const getWordStatus = async (wordId: string) => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return response.status;
};

export const getUserWord = async (wordId: string) => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words/${wordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const words = await response.json();
    return words;
};

export const createUserWord = async (wordId: string, word: TUserWord) => {
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

export const updateUserWord = async (wordId: string, word: TUserWord) => {
    const { token, userId } = loggedUser;
    const response = await fetch(`${USER_WORDS_URL}/${userId}/words/${wordId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
    });
};

export const getAggregatedWords = async (page: number, group: number) => {
    const { token, userId } = loggedUser;
    const response = await fetch(
        `${USER_WORDS_URL}/${userId}/aggregatedWords/?wordsPerPage=20&filter={"$and":[{"group":${group}, "page":${page}}]}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );
    const jsonResponse = await response.json();
    return jsonResponse[0].paginatedResults;
};

export const getAggregatedHardWords = async () => {
    const { token, userId } = loggedUser;
    const response = await fetch(
        `${USER_WORDS_URL}/${userId}/aggregatedWords/?wordsPerPage=600&filter={"userWord.difficulty":"hard"}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );
    const jsonResponse = await response.json();
    return jsonResponse[0].paginatedResults;
};
