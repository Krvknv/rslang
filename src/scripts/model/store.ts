import { LoggedUser, Tauthorization, Ttextbook } from './types';

export const textbook: Ttextbook = {
    page: +localStorage.getItem('textbookPage') || 1,
    group: +localStorage.getItem('textbookGroup') || 1,
    pageColor: localStorage.getItem('textbookPageColor') || '#FFB775',
    audio: [],
};

export const authorization: Tauthorization = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    logged: (this as Tauthorization).user === null ? false : true,
};

export const loggedUser: LoggedUser = {
    name: null,
    token: null,
    userId: null,
};
