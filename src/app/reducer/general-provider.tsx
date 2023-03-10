import { FC } from "react";
import { GameProvider } from "./game-reducer";
import { Props } from "../types";
import { ToastProvider } from "./toast-reducer";
import { BoardProvider } from './board-reducer';
import { HandProvider } from "./hand-reducer";



export const GeneralProvider: FC<Props> = ( { children } ) => {
    return (
        <ToastProvider>
            <GameProvider>
                <HandProvider>
                    <BoardProvider>
                        { children }
                    </BoardProvider>
                </HandProvider>
            </GameProvider>
        </ToastProvider>
    );
};