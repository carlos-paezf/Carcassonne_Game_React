import { ReactNode } from "react";
import { ToastType } from "../constants";
import { Tile } from "../game-logic/tile";

export interface IGameInfo {
    tilesInDeck: number;
    turn: number;
    numberDiscards: number;
    score: number;
    settingsGame: ISettingsGameType;
};


export interface ISettingsGameType {
    playerName: string;
    boardSize: number;
};


export interface IToastProps {
    message: string;
    type?: ToastType;
};


export interface ICoordTile {
    posX: number,
    posY: number;
}


export type Props = {
    children: ReactNode;
};


export interface IReducerAction<T> {
    type: string;
    payload: T;
}


export interface IActionHandlers<T> {
    [ key: string ]: ( object: T, payload: Partial<T> ) => T;
}


export interface IHand {
    id: number,
    tile: Tile;
}