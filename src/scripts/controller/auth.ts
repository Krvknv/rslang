import { updateSignInBtn } from '../model/home-page';
import { showStatisticsBtn } from '../model/statistics';
import { authorization, loggedUser, textbook } from '../model/store';
import { showCards } from '../model/textbook-page';
import { LoggedUser, SignInResponse, SignUpResponse, UserCredentials } from '../model/types';
import { hideModal, showModal, showSignInError } from '../view/modal';

const URL = 'http://127.0.0.1:3000/';

export function getLoggedState(user: null | LoggedUser): boolean {
    return user !== null;
}

async function signOut(user: LoggedUser) {
    const hash = window.location.hash.slice(1);

    localStorage.removeItem('user');
    user.name = null;
    user.token = null;
    user.userId = null;

    authorization.user = null;
    authorization.logged = false;
    authorization.loggedState = false;
    if (textbook.group === 7) {
        textbook.group = 1;
        textbook.page = 1;
        textbook.pageColor = 'rgb(255, 183, 117)';
    }

    if (hash === 'textbook') {
        await showCards();
    }
    showStatisticsBtn();
    console.log('Logged out');
}

export function clickEnterBtn(btn: HTMLElement, user: LoggedUser) {
    if (btn.dataset.role === 'signin') {
        showModal();
    }

    if (btn.dataset.role === 'signout') {
        signOut(user);
        const loggedState = false;
        updateSignInBtn(loggedState);
    }
}

export function updateUser(user: LoggedUser, newName: string, newToken: string, newId: string): void {
    user.name = newName;
    user.token = newToken;
    user.userId = newId;
    console.log('Current user:', user.name, '\ntoken:', user.token, '\nid:', user.userId);
}

function getUserName(email: string): string {
    const emailArray = email.split('@');
    return emailArray[0];
}

async function sendSignIn(user: UserCredentials): Promise<SignInResponse> {
    const rawResponse = await fetch(`${URL}signin`, {
        method: 'POST',
        headers: {
            // eslint-disable-next-line prettier/prettier
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

async function sendSignUp(user: UserCredentials): Promise<SignUpResponse> {
    user.name = getUserName(user.email);

    const rawResponse = await fetch(`${URL}users`, {
        method: 'POST',
        headers: {
            // eslint-disable-next-line prettier/prettier
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

export async function signIn(user: UserCredentials) {
    sendSignIn(user).then(
        (res: SignInResponse) => {
            const hash = window.location.hash.slice(1);
            const newUser: LoggedUser = {
                name: res.name,
                token: res.token,
                userId: res.userId,
            };
            authorization.user = newUser;
            authorization.logged = true;
            authorization.loggedState = true;
            localStorage.setItem('user', JSON.stringify(newUser));

            updateUser(loggedUser, newUser.name, newUser.token, newUser.userId);
            hideModal();
            updateSignInBtn(true);
            if (hash === 'textbook') {
                showCards();
            }

            showStatisticsBtn();
        },
        () => {
            showSignInError();
        }
    );
}

export function signUp(user: UserCredentials): void {
    sendSignUp(user).then(() => {
        signIn(user);
    });
}
