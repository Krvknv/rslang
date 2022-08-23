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

export type Ttextbook = {
    page: number;
    group: number;
    pageColor: string;
    audio: HTMLAudioElement[];
};
