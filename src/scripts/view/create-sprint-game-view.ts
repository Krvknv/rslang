export function renderCup(cupColor: string, cupHeight: number) {
    const cup = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    height="${cupHeight}px" viewBox="0 0 268.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="${cupColor}" stroke="none">
   <path d="M1365 4889 c-159 -127 -295 -233 -302 -236 -6 -2 -132 37 -280 88 -448 154 -442 152 -486 139 -44 -13 -77 -58 -77 -107 0 -18 58 -188 130 -379 l129 -345 -210 -280 c-237 -316 -249 -334 -249 -371 0 -50 23 -79 109 -138 130 -90 215 -160 335 -278 478 -471 761 -1132 816 -1902 5 -80 10 -157 10 -172 l0 -28 -162 0 c-90 0 -183 -5 -208 -11 -102 -23 -198 -118 -226 -223 -20 -73 -20 -533 0 -580 29 -70 -28 -66 871 -66 621 1 814 3 825 13 49 38 50 45 50 334 0 315 -7 348 -87 434 -65 69 -124 92 -260 98 l-113 6 83 110 c310 413 501 882 573 1410 24 177 25 560 0 730 -38 267 -131 610 -190 700 -8 13 -155 117 -326 232 l-311 208 3 393 3 394 -33 29 c-26 23 -41 29 -80 29 -46 0 -51 -4 -337 -231z m240 -748 c11 -11 123 -90 249 -175 l228 -155 -83 -25 c-46 -14 -169 -50 -274 -81 -128 -38 -197 -63 -212 -78 -16 -16 -42 -96 -98 -297 -42 -151 -77 -275 -78 -276 -1 -1 -75 102 -164 230 -90 127 -173 237 -185 245 -26 16 -117 16 -412 1 -104 -6 -191 -9 -193 -7 -1 2 73 105 166 229 93 125 172 240 176 256 5 24 -15 87 -94 298 -55 148 -99 270 -97 271 1 2 121 -38 265 -87 144 -50 274 -90 289 -90 37 0 57 14 287 198 l200 159 5 -298 c5 -282 6 -300 25 -318z m713 -621 c165 -521 142 -1133 -65 -1690 -118 -318 -310 -639 -532 -887 l-56 -63 -72 0 -73 0 0 38 c0 78 -21 331 -36 437 -68 494 -223 924 -475
   1321 -106 167 -207 292 -370 457 -85 87 -153 159 -150 161 3 2 91 5 195 7 l188 4 204 -290 c112 -159 217 -302 234 -317 24 -22 40 -28 75 -28 35 0 51 6 75 28 27 24 38 60 125 377 52 193 99 357 104 365 9 16 581 191 593 181 3 -3 20 -49 36 -101z m-132 -2903 c23 -27 24 -32 24 -208 l0 -179 -650 0 -650 0 0 173 c1 184 6 208 51 233 19 11 136 13 612 11 l589 -2 24 -28z"/>
   </g>
   </svg>`;

    return cup;
}

export const gameSprintView = () => {
    const cups = {
        colors: ['#b08d57', '#C0C0C0', '#e6a80e'],
        height: [80, 100, 120],
    };

    const sprintView = `
    <h1 class="game-view__title">Спринт</h1>
    <div id="sprint-audio-btn">
    <img id="sprint-audio-btn" src="./assets/png/volume-on.png" width="25px">
    </div>
    <div class="sprint-wrapper">
    <div class="cup__wrapper">
    ${cups.height.map((cupHeight, i) => `<p class="cup">${renderCup(cups.colors[i], cups.height[i])}</p>`).join('')}
    </div>
    <div class="score-and-timer__wrapper">
        <div class="sprint-timer circle" id="timer">
            <img src="./assets/png/stopwatch-64.png" width="35px">
            <p class="sprint-timer__counter" id="timer-counter">60</p>
        </div>
        <div class="sprint-score circle" id="score">
            <p class="sprint-score__counter" id="score-counter">0</p>
        </div>
    </div>
    <div class="counter-correct-answers">
        <div class="counter-correct-answers__circle"></div>
        <div class="counter-correct-answers__circle"></div>
        <div class="counter-correct-answers__circle"></div>
    </div>
    <div class="sprint-questions">
        <p class="sprint-questions__points" id="points-counter">
        +10 очков за слово
        </p>
        <p class="sprint-questions__english-word"></p>
        <p class="sprint-questions__translation"></p>
    </div>
    </div>
    <div class="sprint-buttons">
        <button class="sprint-buttons__answer" id="sprint-false-btn">
        Неверно
        </button>
        <button class="sprint-buttons__answer" id="sprint-true-btn">
        Верно
        </button>
    </div>`;

    return sprintView;
};
