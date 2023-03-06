import { createContext } from "react";
import { GameInfoType, ToastPropsType } from "../types";
import { initialGameInfo } from "../constants";


type GameInfoContextType = {
    gameInfo: GameInfoType;
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfoType>>;
};


export const GameInfoContext = createContext<GameInfoContextType>( {
    gameInfo: initialGameInfo,
    setGameInfo: () => { }
} );


type ToastContextType = {
    toasts: ToastPropsType[],
    addToast: ( toast: ToastPropsType ) => void;
};


export const ToastContext = createContext<ToastContextType>( {
    toasts: [],
    addToast: () => { }
} );