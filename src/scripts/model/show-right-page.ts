import { registerHomePage } from './home-page';

export const changePage = () => {
    const hash = window.location.hash.slice(1);

    switch (hash) {
        case 'textbook':
            break;
        case 'audiochallenge':
            break;
        case 'sprint':
            break;
        case 'statistics':
            break;
        default:
            registerHomePage();
    }
};
