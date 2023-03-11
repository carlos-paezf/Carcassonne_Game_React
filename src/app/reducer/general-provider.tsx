import { FC } from "react";
import { GameProvider } from "./game-reducer";
import { Props } from "../types";
import { ToastProvider } from "./toast-reducer";
import { BoardProvider } from './board-reducer';
import { HandProvider } from "./hand-reducer";


/**
 * The GeneralProvider is a function that returns a ToastProvider that wrap a GameProvider that
 * wrap a HandProvider that wrap a BoardProvider that wrap the children.
 * @param  - FC<Props> = ( { children } ) => {
 * @returns The children of the GeneralProvider component.
 */
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