import { createContext } from "react";
import { GameInfoType } from "../types";


type ContextType = {
    gameInfo: GameInfoType;
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfoType>>;
};


export const GameInfoContext = createContext<ContextType>( {
    gameInfo: {
        tilesInDeck: 0,
        turn: 0,
        numberDiscards: 0,
        score: 0
    },
    setGameInfo: () => { }
} );