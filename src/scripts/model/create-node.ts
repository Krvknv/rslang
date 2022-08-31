export const createNode = (tag: string, className: string) => {
    const item = document.createElement(tag);
    item.classList.add(className);

    return item;
};
