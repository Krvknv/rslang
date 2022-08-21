import { showModal } from './modal';
import { registerHomePage } from '../model/home-page';
import { LoggedUser } from '../model/auth';

const loggedUser: LoggedUser = {
    name: null,
    token: null,
};

export const startApp = () => {
    registerHomePage();

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        loggedUser.name = user.name;
        loggedUser.token = user.token;
    }

    console.log('Current user:', loggedUser.name, '\ntoken:', loggedUser.token);

    // handlers
    const btnEnter = document.querySelector('.btn-enter');

    btnEnter.addEventListener('click', showModal);
};

export const updateUser = (newName: string, newToken: string): void => {
    loggedUser.name = newName;
    loggedUser.token = newToken;

    console.log('New user:', loggedUser.name, '\ntoken:', loggedUser.token);
};
