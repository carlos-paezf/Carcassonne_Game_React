import { useState } from "react";
import { IGameInfo } from "../types";
import { initialGameInfo } from "../constants";


export const useGameContext = () => {
    const [ gameInfo, setGameInfo ] = useState<IGameInfo>( initialGameInfo );

    return { gameInfo, setGameInfo };
};