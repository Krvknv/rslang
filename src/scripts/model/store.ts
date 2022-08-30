import { LoggedUser, Tauthorization, Ttextbook } from './types';

export const URL = 'http://127.0.0.1:3000/';

export const textbook: Ttextbook = {
    page: +localStorage.getItem('textbookPage') || 1,
    group: +localStorage.getItem('textbookGroup') || 1,
    pageColor: localStorage.getItem('textbookPageColor') || '#FFB775',
    audio: [],
};

export const authorization: Tauthorization = {
    user: null,
    logged: false,
};

export const loggedUser: LoggedUser = {
    name: null,
    token: null,
    userId: null,
};
