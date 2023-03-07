import { useState } from "react";
import { RoadDirection, TileType, initialGameInfo } from "../constants";
import { Tile } from "../game-logic/tile";
import { IGameInfo, IToastProps } from "../types";


/**
 * It returns an object with three properties, each of which is an object with a state as context
 * and functions to change the context
 * @returns An object with three properties: gameContext, toastContext, and boardContext.
 */
export const useMultipleContext = () => {
    const [ gameInfo, setGameInfo ] = useState<IGameInfo>( initialGameInfo );
    const [ toasts, setToasts ] = useState<IToastProps[]>( [] );
    const [ board, setBoard ] = useState<( Tile | null )[][]>( [] );


    /**
     * AddToast is a function that takes an object with a message and a type property, and adds it to
     * the toasts array.
     * @param {IToastProps}  - IToastProps - This is the type of the parameter that is being passed in.
     */
    const addToast = ( { message, type }: IToastProps ) => {
        setToasts( [ ...toasts, { message, type } ] );
    };


    /**
     * Create a board of size x size, and set the middle tile to a road.
     * @param {number} size - number - The size of the board.
     */
    const createBoard = ( size: number ) => {
        const board: ( Tile | null )[][] = [];

        for ( let i = 0; i < size; i++ ) {
            const row = [];
            for ( let j = 0; j < size; j++ ) {
                row.push( null );
            }
            board.push( row );
        }

        const middle = Math.floor( size / 2 );
        board[ middle ][ middle ] = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );

        setBoard( board );
    };


    /**
     * UpdateBoard is a function that takes a tile, row, and column, and returns a new board with the
     * tile placed at the row and column.
     * @param {Tile} tile - Tile - this is the tile that is being placed on the board
     * @param {number} row - number - The row of the tile that was clicked
     * @param {number} col - number - the column number of the tile that was clicked
     */
    const updateBoard = ( tile: Tile, row: number, col: number ) => {
        const newBoard = [ ...board ];
        newBoard[ row ][ col ] = tile;
        setBoard( newBoard );
    };

    return {
        gameContext: { gameInfo, setGameInfo },
        toastContext: { toasts, addToast },
        boardContext: { board, createBoard, updateBoard }
    };
};