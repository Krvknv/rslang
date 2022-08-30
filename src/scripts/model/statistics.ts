import { authorization } from './store';

export const showStatisticsBtn = () => {
    const statisticsBtn = document.querySelector('#statistics') as HTMLElement;
    if (authorization.user) {
        statisticsBtn.style.display = 'list-item';
    } else {
        statisticsBtn.style.display = 'none';
    }
};
