import { updateSignInBtn } from '../model/home-page';
import { updateUser, clickEnterBtn, getLoggedState } from '../controller/auth';
import { showOrHideGameModal } from '../controller/show-or-hide-game-modal-window';
import { changePage } from '../model/show-right-page';
import { authorization, loggedUser } from '../model/store';

export const startApp = () => {
    // show game modal window
    document.addEventListener('click', showOrHideGameModal);

    // sign in / sign out
    authorization.user = JSON.parse(localStorage.getItem('user'));
    authorization.logged = getLoggedState(authorization.user);

    if (authorization.user) {
        updateUser(loggedUser, authorization.user.name, authorization.user.token, authorization.user.userId);
    }

    updateSignInBtn(authorization.logged);

    // show correct page
    changePage();

    window.addEventListener('hashchange', changePage);

    const btnEnter = document.querySelector('.btn-enter') as HTMLElement;
    btnEnter.addEventListener('click', () => clickEnterBtn(btnEnter, loggedUser));
};
