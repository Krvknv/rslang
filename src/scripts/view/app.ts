import { checkValidity } from '../controller/checkEmail';
import { hideModal, showModal } from '../controller/showModal';
import { registerHomePage } from '../model/homePage';

export const startApp = () => {
    registerHomePage();

    // handlers
    const btnEnter = document.querySelector('.btn-enter');
    const cross = document.querySelector('.cross');
    const cover = document.querySelector('.cover');

    btnEnter.addEventListener('click', showModal);

    cross.addEventListener('click', hideModal);
    cover.addEventListener('click', hideModal);

    const inputEmail = document.querySelector('.email');
    inputEmail.addEventListener('input', checkValidity);
};
