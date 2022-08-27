import { updateSignInBtn } from '../model/home-page';
import { LoggedUser, SignInResponse, SignUpResponse, UserCredentials } from '../model/types';
import { updateUser } from '../view/app';
import { hideModal } from '../view/modal';

const URL = 'http://127.0.0.1:3000/';

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

export function signIn(user: UserCredentials): void {
    sendSignIn(user).then(
        (res: SignInResponse) => {
            const newUser: LoggedUser = {
                name: res.name,
                token: res.token,
                userId: res.userId,
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            updateUser(newUser.name, newUser.token, newUser.userId);
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
