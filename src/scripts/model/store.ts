import { Ttextbook } from './types';

export const textbook: Ttextbook = {
    page: +localStorage.getItem('textbookPage') || 1,
    group: +localStorage.getItem('textbookGroup') || 1,
    pageColor: localStorage.getItem('textbookPageColor') || '#FFB775',
    audio: [],
};
