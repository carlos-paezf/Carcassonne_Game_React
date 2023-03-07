import { createContext } from "react";
import { IGameInfo, IToastProps } from "../types";
import { initialGameInfo } from "../constants";


type GameInfoContextType = {
    gameInfo: IGameInfo;
    setGameInfo: React.Dispatch<React.SetStateAction<IGameInfo>>;
};


export const GameInfoContext = createContext<GameInfoContextType>( {
    gameInfo: initialGameInfo,
    setGameInfo: () => { }
} );


type ToastContextType = {
    toasts: IToastProps[],
    addToast: ( toast: IToastProps ) => void;
};


export const ToastContext = createContext<ToastContextType>( {
    toasts: [],
    addToast: () => { }
} );