import { UserCredentials, LoggedUser, AuthResponse } from '../model/auth';
import { updateUser } from '../view/app';
import { hideModal } from '../view/modal';

const URL = 'http://127.0.0.1:3000/';

function getUserName(email: string): string {
    const emailArray = email.split('@');
    return emailArray[0];
}

async function sendSignIn(user: UserCredentials) {
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

async function sendSignUp(user: UserCredentials) {
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
        (res: AuthResponse) => {
            const newUser: LoggedUser = {
                name: res.name,
                token: res.token,
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            updateUser(newUser.name, newUser.token);
            hideModal();
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
