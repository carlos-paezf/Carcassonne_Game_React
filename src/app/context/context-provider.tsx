import { FC, ReactNode } from "react";
import { BoardContext, GameInfoContext, HandContext, ToastContext } from ".";
import { useMultipleContext } from "../hooks/useMultipleContext";


type Props = {
    children: ReactNode;
};


export const MultipleContextProvider: FC<Props> = ( { children } ) => {
    const {
        gameContext,
        toastContext,
        boardContext,
        handContext
    } = useMultipleContext();


    return (
        <GameInfoContext.Provider value={ gameContext }>
            <ToastContext.Provider value={ toastContext }>
                <BoardContext.Provider value={ boardContext }>
                    <HandContext.Provider value={ handContext }>
                        { children }
                    </HandContext.Provider>
                </BoardContext.Provider>
            </ToastContext.Provider>
        </GameInfoContext.Provider>
    );
};