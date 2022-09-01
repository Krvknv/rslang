import { LoggedUser, TAuthorization, TTextbook } from './types';

export const URL = 'http://127.0.0.1:3000/';

export const textbook: TTextbook = {
    page: +localStorage.getItem('textbookPage') || 1,
    group: +localStorage.getItem('textbookGroup') || 1,
    pageColor: localStorage.getItem('textbookPageColor') || '#FFB775',
    audio: [],
};

export const authorization: TAuthorization = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    getLogged() {
        if (this.user === null) {
            return false;
        } else {
            return true;
        }
    },
};

export const loggedUser: LoggedUser = {
    name: null,
    token: null,
    userId: null,
};
