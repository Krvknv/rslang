export type Tword = {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
};

export type TTextbook = {
    page: number;
    group: number;
    pageColor: string;
    audio: HTMLAudioElement[];
};

export interface LoggedUser {
    name: string;
    token: string;
    userId: string;
}

export type TAuthorization = {
    user: LoggedUser | null;
    getLogged: () => boolean;
};

export interface UserCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface SignInResponse {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export interface SignUpResponse {
    id: string;
    email: string;
    name: string;
}

export type TMarkedWord = {
    difficulty: string;
    optional: { [index: string]: string };
    wordId?: string;
};

export type TUserWord = {
    difficulty: string;
    id?: string;
    optional: {
        count: number;
        correctAnswer: number;
        wrongAnswer: number;
    };
    wordId?: string;
};

export type TFullWord = {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
    difficulty?: string;
};

export interface GameResults {
    gameName: string;
    numberOfCorrectAnswers: number;
    numberOfWrongAnswers: number;
    bestSeriesOfCorrectAnswer: number;
    score: number;
    date: string;
    numberOfNewWords: number;
}

export type TPages = {
    current: number;
    prev: number;
    next: number;
};
