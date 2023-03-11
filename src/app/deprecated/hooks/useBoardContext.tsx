import { useState } from "react";
import { Tile } from "../../game-logic/tile";
import { RoadDirection, TileType } from "../../constants";


export const useBoardContext = () => {
    const [ board, setBoard ] = useState<( Tile | null )[][]>( [] );

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
        board, createBoard, updateBoard
    };
};