import { LoggedUser, TAuthorization, TTextbook } from './types';

export const textbook: TTextbook = {
    page: +localStorage.getItem('textbookPage') || 1,
    group: +localStorage.getItem('textbookGroup') || 1,
    pageColor: localStorage.getItem('textbookPageColor') || '#FFB775',
    audio: [],
};

export const authorization: TAuthorization = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    logged: (this as TAuthorization).user === null ? false : true,
    loggedState: null,
};

export const loggedUser: LoggedUser = {
    name: null,
    token: null,
    userId: null,
};
