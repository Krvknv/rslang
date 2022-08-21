import { textbook } from '../model/store';
import { updateCards } from '../model/textbook-page';

export const changeGroup = async (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.classList.contains('btn-group')) {
        const main = document.querySelector('.main') as HTMLElement;
        const number = document.querySelector('.number');
        const groupNum = node.id;
        const pageColor = node.style.backgroundColor;

        textbook.group = +groupNum;

        main.style.backgroundColor = pageColor;

        localStorage.setItem('textbookGroup', groupNum);
        localStorage.setItem('textbookPageColor', pageColor);
        localStorage.setItem('textbookPage', '1');

        textbook.page = 1;
        number.textContent = `${textbook.page}/30`;

        updateCards();
    }
};

const showPrevPage = async () => {
    if (textbook.page > 1) {
        const number = document.querySelector('.number');

        textbook.page -= 1;
        number.textContent = `${textbook.page}/30`;
        localStorage.setItem('textbookPage', `${textbook.page}`);

        updateCards();
    }
};
const showNextPage = async () => {
    if (textbook.page < 30) {
        const number = document.querySelector('.number');

        textbook.page += 1;
        number.textContent = `${textbook.page}/30`;
        localStorage.setItem('textbookPage', `${textbook.page}`);

        updateCards();
    }
};

export const changePageNumber = (event: Event) => {
    const node = event.target as HTMLButtonElement;
    if (node.classList.contains('prev-btn')) {
        showPrevPage();
    }
    if (node.classList.contains('next-btn')) {
        showNextPage();
    }
};

export const makeSound = (...arg: [string, string, string, Event]) => {
    const voiceArr = document.querySelectorAll('.card__voice');
    let list = arg.slice(0, 3);
    const audioElements: HTMLAudioElement[] = [];
    if (textbook.audio.length === 0) {
        voiceArr.forEach((item) => {
            item.classList.remove('on');
            item.classList.add('mute');
        });
        for (let i = 0; i < list.length; i++) {
            const audio = new Audio(`http://localhost:3000/${list[i]}`);
            textbook.audio.push(audio);
            audioElements.push(audio);

            if (i === 0) {
                // Первое аудио запускаем
                audioElements[i].play();
            } else {
                // Остальные — после окончания предыдущего
                audioElements[i - 1].addEventListener('ended', function () {
                    audioElements[i].play();

                    list = list.slice(1);
                });
            }
        }
    } else {
        voiceArr.forEach((item) => {
            item.classList.remove('mute');
            item.classList.add('on');
        });
        textbook.audio.forEach((item) => item.pause());
        textbook.audio = [];
    }
};
