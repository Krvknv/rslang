export const checkEmailValidity = (event: Event): boolean => {
    const node = event.target as HTMLInputElement;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(node.value);
};

export const checkPasswordValidity = (event: Event): boolean => {
    const node = event.target as HTMLInputElement;
    return node.value.length >= 8;
};
