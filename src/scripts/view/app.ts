import { showModal } from './modal';
import { updateSignInBtn } from '../model/home-page';
import { LoggedUser } from '../model/auth';
import { changePage } from '../model/show-right-page';

const loggedUser: LoggedUser = {
    name: null,
    token: null,
};

export const updateUser = (newName: string, newToken: string): void => {
    loggedUser.name = newName;
    loggedUser.token = newToken;

    console.log('Current user:', loggedUser.name, '\ntoken:', loggedUser.token);
};

export const startApp = () => {
    changePage();
    // show correct page
    window.addEventListener('hashchange', changePage);

    // sign in / sign out
    const user = JSON.parse(localStorage.getItem('user'));
    let logged = false;

    if (user) {
        updateUser(user.name, user.token);
        logged = true;
    }

    updateSignInBtn(logged);

    const btnEnter = document.querySelector('.btn-enter') as HTMLElement;
    btnEnter.addEventListener('click', () => {
        if (btnEnter.dataset.role === 'signin') {
            showModal();
        }

        if (btnEnter.dataset.role === 'signout') {
            logged = false;
            loggedUser.name = null;
            loggedUser.token = null;
            updateSignInBtn(logged);
            console.log('Logged out');
        }
    });
};
