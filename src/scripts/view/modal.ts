import { ModalState } from '../model/modal';
import { checkEmailValidity, checkPasswordValidity } from '../controller/modal';
import { signIn, signUp } from '../controller/auth';

const renderCover = (): HTMLElement => {
    const cover = document.createElement('div');
    cover.id = 'cover';
    cover.classList.add('cover');
    return cover;
};

const renderModal = (): HTMLElement => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modal';
    modal.innerHTML = `
    <div class="modal">
        <button class="cross" id="modal-close"></button>
        <h2 class="title modal__title" id="modal-title">Вход</h2>
        <form class="modal__form" action="" id="modal-form">
            <input class="modal__input email" type="text" placeholder="E-mail" id="input-email"/>
            <input class="modal__input" type="password" placeholder="Пароль" id="input-password"/>
            <button class="btn modal__btn" id="modal-btn"></button>
        </form>
        <button class="subtitle" id="modal-switch"></button>
    </div>
    `;
    return modal;
};

const changeSwitchText = (signState: ModalState): void => {
    const modalStateSwitch = document.getElementById('modal-switch') as HTMLElement;

    if (signState === ModalState.SIGN_IN) {
        modalStateSwitch.innerText = 'Регистрация';
    }

    if (signState === ModalState.SIGN_UP) {
        modalStateSwitch.innerText = 'Вход';
    }
};

const changeModalBtn = (signState: ModalState): string => {
    const modalBtn = document.getElementById('modal-btn') as HTMLElement;
    modalBtn.dataset.role = signState;

    if (signState === ModalState.SIGN_IN) {
        return (modalBtn.innerText = 'Войти');
    }

    if (signState === ModalState.SIGN_UP) {
        return (modalBtn.innerText = 'Регистрация');
    }
};

const changeModalTitle = (signState: ModalState): string => {
    const modalTitle = document.getElementById('modal-title') as HTMLElement;

    if (signState === ModalState.SIGN_IN) {
        return (modalTitle.innerText = 'Вход');
    }

    if (signState === ModalState.SIGN_UP) {
        return (modalTitle.innerText = 'Регистрация');
    }
};

const toggleDisableBtn = (emailValidity: boolean, passwordValidity: boolean): void => {
    const modalBtn = document.querySelector('.modal__btn') as HTMLButtonElement;
    if (emailValidity && passwordValidity) {
        modalBtn.disabled = false;
        modalBtn.classList.remove('invalid');
    } else {
        modalBtn.disabled = true;
        modalBtn.classList.add('invalid');
    }
};

const toggleInvalidInput = (event: Event, validity: boolean): void => {
    const node = event.target as HTMLInputElement;
    if (validity) {
        node.classList.remove('invalid');
    } else {
        node.classList.add('invalid');
    }
};

export const showSignInError = (): void => {
    const inputPassword = document.getElementById('input-password');
    const errorMessage = document.createElement('div');
    errorMessage.innerText = 'Неправильный логин или пароль!';

    inputPassword.after(errorMessage);
};

export const hideModal = (): void => {
    const cover = document.getElementById('cover');
    cover.remove();

    const modal = document.getElementById('modal');
    modal.remove();

    document.body.style.overflow = '';
};

export const showModal = () => {
    let currentModalState = ModalState.SIGN_IN;

    const cover = renderCover();
    document.body.append(cover);
    document.body.style.overflow = 'hidden';
    cover.addEventListener('click', hideModal);

    const modal = renderModal();
    document.body.append(modal);

    changeSwitchText(currentModalState);
    changeModalBtn(currentModalState);
    changeModalTitle(currentModalState);

    const inputEmail = document.getElementById('input-email');
    const inputPassword = document.getElementById('input-password');

    let emailValidity = true;
    let passwordValidity = true;
    toggleDisableBtn(emailValidity, passwordValidity);

    inputEmail.addEventListener('input', (event: Event) => {
        emailValidity = checkEmailValidity(event);
        toggleDisableBtn(emailValidity, passwordValidity);
        toggleInvalidInput(event, emailValidity);
    });
    inputPassword.addEventListener('input', (event: Event) => {
        passwordValidity = checkPasswordValidity(event);
        toggleDisableBtn(emailValidity, passwordValidity);
        toggleInvalidInput(event, passwordValidity);
    });

    const modalStateSwitch = document.getElementById('modal-switch') as HTMLElement;
    modalStateSwitch.addEventListener('click', () => {
        currentModalState = currentModalState === ModalState.SIGN_IN ? ModalState.SIGN_UP : ModalState.SIGN_IN;
        changeSwitchText(currentModalState);
        changeModalBtn(currentModalState);
        changeModalTitle(currentModalState);
    });

    const cross = document.getElementById('modal-close');
    cross.addEventListener('click', hideModal);

    const modalBtn = document.getElementById('modal-btn') as HTMLElement;
    modalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const user = {
            email: (inputEmail as HTMLInputElement).value,
            password: (inputPassword as HTMLInputElement).value,
        };

        if (modalBtn.dataset.role === 'signin') signIn(user);
        if (modalBtn.dataset.role === 'signup') signUp(user);
    });
};
