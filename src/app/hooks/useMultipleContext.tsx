import { useState } from "react";
import { RoadDirection, TileType, initialGameInfo } from "../constants";
import { Tile } from "../game-logic/tile";
import { IGameInfo, IToastProps } from "../types";
import { useGameContext } from "./useGameContext";
import { useToastContext } from "./useToastContext";
import { useBoardContext } from "./useBoardContext";
import { useHandContext } from "./useHandContext";


/**
 * It returns an object with three properties, each of which is an object with a state as context
 * and functions to change the context
 * @returns An object with three properties: gameContext, toastContext, and boardContext.
 */
export const useMultipleContext = () => {
    const { gameInfo, setGameInfo } = useGameContext();
    const { toasts, addToast } = useToastContext();
    const { board, createBoard, updateBoard } = useBoardContext();
    const { hand, appendTileToHand, discardHand } = useHandContext();

    return {
        gameContext: { gameInfo, setGameInfo },
        toastContext: { toasts, addToast },
        boardContext: { board, createBoard, updateBoard },
        handContext: { hand, appendTileToHand, discardHand }
    };
};