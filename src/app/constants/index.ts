import { IGameInfo } from "../types";


export const initialGameInfo: IGameInfo = {
    tilesInDeck: 0,
    tilesPlayed: 0,
    turn: 0,
    numberDiscards: 5,
    lastTurnDiscarded: 0,
    score: 0,
    settingsGame: {
        playerName: '',
        boardSize: 11
    }
};


export enum ToastType {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success'
}


export const TILES_PER_HAND = 4;


export enum TileType {
    ROAD = 'ROAD',
    CITY = 'CITY',
    ABBEY = 'ABBEY'
};


export const tileInterval = {
    road: ( 10 / 15 ),
    city: ( 3.5 / 15 ),
    abbey: ( 1.5 / 15 )
};


export enum TilePoint {
    ROAD = 1,
    ABBEY = 1,
    CITY = 2,
    CHAIN = 1
};


export enum RoadDirection {
    RIGHT_LEFT = 'RIGHT_LEFT',
    UP_DOWN = 'UP_DOWN',
    FOUR_WAY = 'FOUR_WAY',
    THREE_WAY = 'THREE_WAY',
    CORNER = 'CORNER'
};


export enum IncrementType {
    ABBEY_NEIGHBORHOOD = 'ABBEY_NEIGHBORHOOD',
    BY_CITY_CHAIN = 'BY_CITY_CHAIN',
    BY_NEIGHBORING_ABBEY = 'BY_NEIGHBORING_ABBEY'
}


export const tilesProbability = {
    roadProbability: tileInterval.road,
    cityProbability: tileInterval.city,
    abbeyProbability: tileInterval.abbey
};