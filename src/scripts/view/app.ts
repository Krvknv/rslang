import { checkValidity } from '../controller/check-email';
import { hideModal, showModal } from '../controller/show-modal';
import { changePage } from '../model/show-right-page';

export const startApp = () => {
    changePage();

    // handlers
    //

    // show correct page
    window.addEventListener('hashchange', changePage);

    // show and hide modal window
    const btnEnter = document.querySelector('.btn-enter');
    const cross = document.querySelector('.cross');
    const cover = document.querySelector('.cover');

    btnEnter.addEventListener('click', showModal);

    cross.addEventListener('click', hideModal);
    cover.addEventListener('click', hideModal);

    const inputEmail = document.querySelector('.email');
    inputEmail.addEventListener('input', checkValidity);
};
