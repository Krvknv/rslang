export const checkValidity = (event: Event) => {
    const modalBtn = document.querySelector('.modal__btn') as HTMLButtonElement;
    const node = event.target as HTMLInputElement;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (EMAIL_REGEXP.test(node.value)) {
        modalBtn.disabled = false;
        node.classList.remove('invalid');
    } else {
        modalBtn.disabled = true;
        node.classList.add('invalid');
    }

    if (node.value === '') {
        node.classList.remove('invalid');
    }
};
