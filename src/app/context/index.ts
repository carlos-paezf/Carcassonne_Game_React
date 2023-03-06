import { createContext } from "react";
import { GameInfoType, ToastPropsType } from "../types";


type GameInfoContextType = {
    gameInfo: GameInfoType;
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfoType>>;
};


export const GameInfoContext = createContext<GameInfoContextType>( {
    gameInfo: {
        tilesInDeck: 0,
        turn: 0,
        numberDiscards: 0,
        score: 0,
        settingsGame: {
            playerName: '',
            boardSize: 0
        }
    },
    setGameInfo: () => { }
} );


type ToastContextType = {
    toasts: ToastPropsType[],
    setToasts: React.Dispatch<React.SetStateAction<ToastPropsType[]>>;
};


export const ToastContext = createContext<ToastContextType>( {
    toasts: [],
    setToasts: () => { }
} );