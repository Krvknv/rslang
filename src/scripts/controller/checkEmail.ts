export const checkValidity = (event: Event) => {
    const modalBtn = document.querySelector('.modal__btn') as HTMLButtonElement;
    const node = event.target as HTMLInputElement;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (EMAIL_REGEXP.test(node.value)) {
        modalBtn.disabled = false;
        node.style.border = '1px solid #69379a';
    } else {
        node.style.border = '1px solid red';
        modalBtn.disabled = true;
    }
    console.log(node);
};
