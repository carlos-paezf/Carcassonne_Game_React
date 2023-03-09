import { FC } from "react";
import { GameProvider } from "./game-reducer";
import { Props } from "../types";
import { ToastProvider } from "./toast-reducer";
import { BoardProvider } from './board-reducer';



export const GeneralProvider: FC<Props> = ( { children } ) => {
    return (
        <ToastProvider>
            <GameProvider>
                <BoardProvider>
                    { children }
                </BoardProvider>
            </GameProvider>
        </ToastProvider>
    );
};