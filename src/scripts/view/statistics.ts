import { Chart, registerables } from 'chart.js';
import { getMarkedWords } from '../model/api/words';
import { createNode } from '../model/create-node';
import { getDate } from '../model/get-date';
import { authorization } from '../model/store';
import { TMarkedWord } from '../model/types';

Chart.register(...registerables);

const getLearntWords = async () => {
    const markedWord = await getMarkedWords();
    const learntWords = markedWord.filter((item: TMarkedWord) => item.difficulty === 'learnt');

    return learntWords;
};

const getLearntWordsperDay = async () => {
    const learntWords = await getLearntWords();
    const dateObj: { [index: string]: number } = {};

    learntWords.forEach((item: TMarkedWord) => {
        if (item.optional) {
            const key = item.optional.date;
            if (dateObj[key]) {
                dateObj[key]++;
            } else {
                dateObj[key] = 1;
            }
        }
    });

    return dateObj;
};

const getAmountLearntWordsToday = async () => {
    const learntWords = await getLearntWords();
    const date = getDate();

    const learntWordsToday = learntWords.filter((item: TMarkedWord) => item?.optional?.date === date);
    const amountLearntWordsLoday = learntWordsToday.length;

    return amountLearntWordsLoday;
};

export const showStatisticsBtn = () => {
    const statisticsBtn = document.querySelector('#statistics') as HTMLElement;
    if (authorization.getLogged()) {
        statisticsBtn.style.display = 'list-item';
    } else {
        statisticsBtn.style.display = 'none';
    }
};

const createTitle = () => {
    const title = document.createElement('h2');
    title.classList.add('title', 'statistics-title');
    title.textContent = 'Статистика';

    return title;
};

const createSubtitle = (className: string, text: string) => {
    const subtitle = createNode('h3', className);
    subtitle.textContent = text;

    return subtitle;
};

const createDayStatisticsByWords = async () => {
    const wrapper = createNode('div', 'wrapper-words-day');
    const amountLearntWordsLoday = await getAmountLearntWordsToday();

    const newWordsWrapper = createNode('div', 'statistics-words-day-item');
    const newWordsText = createNode('span', 'statistics-day-item');
    newWordsText.textContent = 'Количество новых слов за день:';
    const newWordsvalue = createNode('span', 'statistics-day-item-value');
    newWordsvalue.textContent = 'добавить';

    newWordsWrapper.append(newWordsText, newWordsvalue);

    const learntWordsWrapper = createNode('div', 'statistics-words-day-item');
    const learntWordsText = createNode('span', 'statistics-day-item');
    learntWordsText.textContent = 'Количество изученных слов за день:';
    const learntWordsvalue = createNode('span', 'statistics-day-item-value');
    learntWordsvalue.textContent = String(amountLearntWordsLoday);

    learntWordsWrapper.append(learntWordsText, learntWordsvalue);

    const rightAnswerWrapper = createNode('div', 'statistics-words-day-item');
    const rightAnswerText = createNode('span', 'statistics-day-item');
    rightAnswerText.textContent = 'Процент правильных ответов:';
    const rightAnswervalue = createNode('span', 'statistics-day-item-value');
    rightAnswervalue.textContent = 'добавить';
    rightAnswerWrapper.append(rightAnswerText, rightAnswervalue);

    wrapper.append(newWordsWrapper, learntWordsWrapper, rightAnswerWrapper);

    return wrapper;
};
const createDayStatisticsBySprint = () => {
    const wrapper = createNode('div', 'wrapper-sprint-day');

    const gameName = createNode('span', 'statistics-game-name');
    gameName.textContent = 'Спринт';

    const newWordsWrapper = createNode('div', 'statistics-sprint-day-item');
    const newWordsText = createNode('span', 'statistics-day-item');
    newWordsText.textContent = 'Количество новых слов за день:';
    const newWordsvalue = createNode('span', 'statistics-day-item-value');
    newWordsvalue.textContent = 'добавить';

    newWordsWrapper.append(newWordsText, newWordsvalue);

    const rightAnswerWrapper = createNode('div', 'statistics-sprint-day-item');
    const rightAnswerText = createNode('span', 'statistics-day-item');
    rightAnswerText.textContent = 'Процент правильных ответов:';
    const rightAnswervalue = createNode('span', 'statistics-day-item-value');
    rightAnswervalue.textContent = 'добавить';
    rightAnswerWrapper.append(rightAnswerText, rightAnswervalue);

    const seriesAnswerWrapper = createNode('div', 'statistics-sprint-day-item');
    const seriesAnswerText = createNode('span', 'statistics-day-item');
    seriesAnswerText.textContent = 'Cамая длинная серия правильных ответов:';
    const seriesAnswervalue = createNode('span', 'statistics-day-item-value');
    seriesAnswervalue.textContent = 'добавить';

    seriesAnswerWrapper.append(seriesAnswerText, seriesAnswervalue);

    wrapper.append(gameName, newWordsWrapper, rightAnswerWrapper, seriesAnswerWrapper);

    return wrapper;
};
const createDayStatisticsByChallenge = () => {
    const wrapper = createNode('div', 'wrapper-challenge-day');

    const gameName = createNode('span', 'statistics-game-name');
    gameName.textContent = 'Аудиовызов';

    const newWordsWrapper = createNode('div', 'statistics-challenge-day-item');
    const newWordsText = createNode('span', 'statistics-day-item');
    newWordsText.textContent = 'Количество новых слов за день:';
    const newWordsvalue = createNode('span', 'statistics-day-item-value');
    newWordsvalue.textContent = 'добавить';

    newWordsWrapper.append(newWordsText, newWordsvalue);

    const rightAnswerWrapper = createNode('div', 'statistics-challenge-day-item');
    const rightAnswerText = createNode('span', 'statistics-day-item');
    rightAnswerText.textContent = 'Процент правильных ответов:';
    const rightAnswervalue = createNode('span', 'statistics-day-item-value');
    rightAnswervalue.textContent = 'добавить';
    rightAnswerWrapper.append(rightAnswerText, rightAnswervalue);

    const seriesAnswerWrapper = createNode('div', 'statistics-challenge-day-item');
    const seriesAnswerText = createNode('span', 'statistics-day-item');
    seriesAnswerText.textContent = 'Cамая длинная серия правильных ответов:';
    const seriesAnswervalue = createNode('span', 'statistics-day-item-value');
    seriesAnswervalue.textContent = 'добавить';

    seriesAnswerWrapper.append(seriesAnswerText, seriesAnswervalue);

    wrapper.append(gameName, newWordsWrapper, rightAnswerWrapper, seriesAnswerWrapper);

    return wrapper;
};

const createChartWordsperDay = async () => {
    const chartWrapper = createNode('div', 'chart-wrapper');
    const chart = document.createElement('canvas');
    chart.id = 'chart-words';
    const dateObj = await getLearntWordsperDay();
    const wordsAmount = [];
    const days = [];
    for (const [key, value] of Object.entries(dateObj)) {
        wordsAmount.push(value);
        days.push(key);
    }
    chartWrapper.append(chart);

    const ctx = chart.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'количество слов',
                    data: wordsAmount,
                    backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
    return chartWrapper;
};
const createChartWords = async () => {
    const chartWrapper = createNode('div', 'chart-wrapper');
    const chart = document.createElement('canvas');
    chart.id = 'chart-words';
    const dateObj = await getLearntWordsperDay();
    const wordsAmountArr: number[] = [];
    const days = [];
    for (const [key, value] of Object.entries(dateObj)) {
        const wordsAmount = wordsAmountArr.length
            ? wordsAmountArr.reduce((sum, current) => sum + current, 0) + value
            : value;
        wordsAmountArr.push(wordsAmount);
        days.push(key);
    }
    chartWrapper.append(chart);
    const data = {
        labels: days,
        datasets: [
            {
                label: 'количество изученных слов',
                data: wordsAmountArr,
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'rgba(153, 102, 255, 0.4)',
                pointRadius: 5,
            },
        ],
    };
    const ctx = chart.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    stacked: true,
                },
            },
        },
    });
    return chartWrapper;
};
export const registerStatistics = async () => {
    const main = document.querySelector('.main') as HTMLElement;
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main__container', 'container');
    const title = createTitle();
    const date = getDate();
    const subtitleDay = createSubtitle('subtitle-day', `Cтатистика за ${date}`);
    const dayStatistics = createNode('div', 'statistics-day-wrapper');
    const wrapperWordsDay = await createDayStatisticsByWords();
    const wrapperSprintDay = createDayStatisticsBySprint();
    const wrapperChallengeDay = createDayStatisticsByChallenge();
    const subtitleAllWordsperDay = createSubtitle(
        'subtitle-all-words',
        'Количество изученных слов за каждый день изучения'
    );
    const chartWordsperDay = await createChartWordsperDay();

    const subtitleAllWords = createSubtitle('subtitle-all-words', 'Количество всех изученных слов');
    const chartWords = await createChartWords();

    dayStatistics.append(wrapperWordsDay, wrapperSprintDay, wrapperChallengeDay);

    mainContainer.append(
        title,
        subtitleDay,
        dayStatistics,
        subtitleAllWordsperDay,
        chartWordsperDay,
        subtitleAllWords,
        chartWords
    );

    main.innerHTML = null;
    main.style.backgroundColor = '#fff';

    main.append(mainContainer);
};
