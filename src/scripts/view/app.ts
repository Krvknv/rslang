import { hideModal, showModal } from '../controller/showModal';
import { registerHomePage } from '../modal/homePage';

export const startApp = () => {
    registerHomePage();

    // handlers
    const btnEnter = document.querySelector('.btn-enter');
    const cross = document.querySelector('.cross');
    const cover = document.querySelector('.cover');

    btnEnter.addEventListener('click', showModal);

    cross.addEventListener('click', hideModal);
    cover.addEventListener('click', hideModal);
};
