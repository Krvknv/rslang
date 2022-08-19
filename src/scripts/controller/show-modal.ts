export const showModal = () => {
    const cover = document.querySelector('.cover') as HTMLElement;
    cover.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

export const hideModal = (event: Event) => {
    const node = event.target as HTMLElement;
    if (node.classList.contains('cross') || node.classList.contains('cover')) {
        const cover = document.querySelector('.cover') as HTMLElement;
        cover.style.display = 'none';
        document.body.style.overflow = '';
    }
};
