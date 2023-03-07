export interface IGameInfo {
    tilesInDeck: number;
    turn: number;
    numberDiscards: number;
    score: number;
    settingsGame: ISettingsGameType;
};


export interface ISettingsGameType {
    playerName: string;
    boardSize: number;
};


export interface IToastProps {
    message: string;
    type?: ToastType;
};


export enum ToastType {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success'
}