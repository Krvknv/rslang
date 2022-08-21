import { showModal } from './modal';
import { registerHomePage } from '../model/home-page';

export const startApp = () => {
    registerHomePage();

    // handlers
    const btnEnter = document.querySelector('.btn-enter');

    btnEnter.addEventListener('click', showModal);
};
