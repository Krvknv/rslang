import { updateSignInBtn } from '../model/home-page';
import { updateUser, clickEnterBtn } from '../controller/auth';
import { showOrHideGameModal } from '../controller/show-or-hide-game-modal-window';
import { changePage } from '../model/show-right-page';
import { startGame } from '../controller/sprint-event-listeners';
import { acceptAnswersOnKeyboard } from '../controller/accept-answer-on-keyboard';
import { authorization, loggedUser } from '../model/store';
import { showStatisticsBtn } from './statistics';

export const startApp = () => {
    // show game modal window
    document.addEventListener('click', showOrHideGameModal);

    // startSprintGame
    document.addEventListener('click', startGame);
    document.addEventListener('keydown', acceptAnswersOnKeyboard);

    // sign in / sign out
    if (authorization.getLogged()) {
        updateUser(loggedUser, authorization.user?.name, authorization.user?.token, authorization.user?.userId);
    }

    updateSignInBtn(authorization.getLogged());

    // show correct page
    changePage();
    showStatisticsBtn();
    window.addEventListener('hashchange', changePage);

    const btnEnter = document.querySelector('.btn-enter') as HTMLElement;
    btnEnter.addEventListener('click', () => clickEnterBtn(btnEnter, loggedUser));
};
