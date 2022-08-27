import { updateSignInBtn } from '../model/home-page';
import { currentLoggedUser, updateUser, clickEnterBtn } from '../controller/auth';
import { showOrHideGameModal } from '../controller/show-or-hide-game-modal-window';
import { changePage } from '../model/show-right-page';

export const startApp = () => {
    changePage();
    // show correct page
    window.addEventListener('hashchange', changePage);

    // show game modal window
    document.addEventListener('click', showOrHideGameModal);

    // sign in / sign out
    const user = JSON.parse(localStorage.getItem('user'));
    let logged = false;

    if (user) {
        updateUser(currentLoggedUser, user.name, user.token);
        logged = true;
    }

    updateSignInBtn(logged);

    const btnEnter = document.querySelector('.btn-enter') as HTMLElement;
    btnEnter.addEventListener('click', () => clickEnterBtn(btnEnter, currentLoggedUser, logged));
};
