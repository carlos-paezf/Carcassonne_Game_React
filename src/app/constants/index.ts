import { IGameInfo } from "../types";


export const initialGameInfo: IGameInfo = {
    tilesInDeck: 0,
    turn: 0,
    numberDiscards: 5,
    score: 0,
    settingsGame: {
        playerName: '',
        boardSize: 3
    }
};