import { createContext } from "react";
import { IGameInfo, IToastProps } from "../types";
import { initialGameInfo } from "../constants";
import { Tile } from "../game-logic/tile";


type GameInfoContextType = {
    gameInfo: IGameInfo;
    setGameInfo: React.Dispatch<React.SetStateAction<IGameInfo>>;
};


export const GameInfoContext = createContext<GameInfoContextType>( {
    gameInfo: initialGameInfo,
    setGameInfo: () => { }
} );


type ToastContextType = {
    toasts: IToastProps[];
    addToast: ( toast: IToastProps ) => void;
};


export const ToastContext = createContext<ToastContextType>( {
    toasts: [],
    addToast: () => { }
} );


type BoardContextType = {
    board: ( Tile | null )[][];
    createBoard: ( size: number ) => void;
    updateBoard: ( value: any, row: number, col: number ) => void;
};


export const BoardContext = createContext<BoardContextType>( {
    board: [],
    createBoard: () => { },
    updateBoard: () => { }
} );