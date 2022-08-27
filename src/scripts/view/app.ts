import { showModal } from './modal';
import { updateSignInBtn } from '../model/home-page';
import { changePage } from '../model/show-right-page';
import { authorization, loggedUser } from '../model/store';

// export const loggedUser: LoggedUser = {
//     name: null,
//     token: null,
// };

export const updateUser = (newName: string, newToken: string, userId: string): void => {
    loggedUser.name = newName;
    loggedUser.token = newToken;
    loggedUser.userId = userId;

    console.log('Current user:', loggedUser.name, '\ntoken:', loggedUser.token, '\nuserId:', loggedUser.userId);
};

export const startApp = async () => {
    // sign in / sign out
    // const user = JSON.parse(localStorage.getItem('user'));
    // let logged = false;

    if (authorization.logged) {
        updateUser(authorization.user?.name, authorization.user?.token, authorization.user?.userId);
        authorization.logged = true;
    }

    updateSignInBtn(authorization.logged);

    changePage();
    // show correct page
    window.addEventListener('hashchange', changePage);

    const btnEnter = document.querySelector('.btn-enter') as HTMLElement;
    btnEnter.addEventListener('click', () => {
        if (btnEnter.dataset.role === 'signin') {
            showModal();
        }

        if (btnEnter.dataset.role === 'signout') {
            authorization.logged = false;
            loggedUser.name = null;
            loggedUser.token = null;
            updateSignInBtn(authorization.logged);
            console.log('Logged out');
        }
    });
};
