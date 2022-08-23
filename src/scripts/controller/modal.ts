export const checkEmailValidity = (event: Event): boolean => {
    const node = event.target as HTMLInputElement;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (node.value === '') {
        return true;
    }

    return EMAIL_REGEXP.test(node.value);
};

export const checkPasswordValidity = (event: Event): boolean => {
    const node = event.target as HTMLInputElement;

    if (node.value === '') {
        return true;
    }

    return node.value.length >= 8;
};
