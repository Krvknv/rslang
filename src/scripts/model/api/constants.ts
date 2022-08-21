import { GET_WORDS_URL } from './variables';

export const getWords = async (page: number, group: number) => {
    const response = await fetch(`${GET_WORDS_URL}?_page=${page}&_group=${group}`);
    const jsonResponse = await response.json();

    return jsonResponse;
};
