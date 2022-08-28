import { UserCredentials, LoggedUser, SignInResponse, SignUpResponse } from '../model/auth';
import { updateSignInBtn } from '../model/home-page';
import { hideModal, showModal } from '../view/modal';

const URL = 'http://127.0.0.1:3000/';

export const currentLoggedUser: LoggedUser = {
    name: null,
    token: null,
    id: null,
};

export function getLoggedState(user: null | LoggedUser): boolean {
    return user !== null;
}

function signOut(user: LoggedUser) {
    localStorage.clear();
    user.name = null;
    user.token = null;
    user.id = null;
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
    user.id = newId;

    console.log('Current user:', user.name, '\ntoken:', user.token, '\nid:', user.id);
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
            'Accept': 'application/json',
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    return content;
}

export function signIn(user: UserCredentials): void {
    sendSignIn(user).then(
        (res: SignInResponse) => {
            const newUser: LoggedUser = {
                name: res.name,
                token: res.token,
                id: res.userId,
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            updateUser(currentLoggedUser, newUser.name, newUser.token, newUser.id);
            hideModal();
            updateSignInBtn(true);
        },
        () => {
            console.log('Wrong user name or password!');
        }
    );
}

export function signUp(user: UserCredentials): void {
    sendSignUp(user).then(() => {
        signIn(user);
    });
}
