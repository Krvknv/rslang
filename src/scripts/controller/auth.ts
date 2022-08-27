import { UserCredentials, LoggedUser, SignInResponse, SignUpResponse } from '../model/auth';
import { updateSignInBtn } from '../model/home-page';
import { hideModal, showModal } from '../view/modal';

const URL = 'http://127.0.0.1:3000/';

export const currentLoggedUser: LoggedUser = {
    name: null,
    token: null,
};

export function clickEnterBtn(btn: HTMLElement, user: LoggedUser, loggedStatus: boolean) {
    if (btn.dataset.role === 'signin') {
        showModal();
    }

    if (btn.dataset.role === 'signout') {
        loggedStatus = false;
        currentLoggedUser.name = null;
        currentLoggedUser.token = null;
        updateSignInBtn(loggedStatus);
        console.log('Logged out');
    }
}

export function updateUser(user: LoggedUser, newName: string, newToken: string): void {
    user.name = newName;
    user.token = newToken;

    console.log('Current user:', user.name, '\ntoken:', user.token);
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
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            updateUser(currentLoggedUser, newUser.name, newUser.token);
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

export function signOut() {
    return 0;
}
