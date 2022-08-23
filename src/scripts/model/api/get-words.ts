import { GET_WORDS_URL } from './constants';

export const getWords = async (page: number, group: number) => {
    const response = await fetch(`${GET_WORDS_URL}?page=${page}&group=${group}`);
    const jsonResponse = await response.json();

    return jsonResponse;
};
