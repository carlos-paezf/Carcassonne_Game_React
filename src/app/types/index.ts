export type GameInfoType = {
    tilesInDeck: number;
    turn: number;
    numberDiscards: number;
    score: number;
    settingsGame: SettingsGameType;
};


export type SettingsGameType = {
    playerName: string;
    boardSize: number;
};


export type ToastPropsType = {
    message: string;
    type?: string;
};