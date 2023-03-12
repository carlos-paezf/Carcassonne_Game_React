import { TileType, ToastType } from "../constants";
import { Tile } from "../game-logic/tile";
import { VonNeumannNeighborhoods } from "../game-logic/von-neumann-neighborhoods";
import { useBoard } from "../reducer/board-reducer";
import { useGameInfo } from "../reducer/game-reducer";
import { useToastDispatch } from "../reducer/toast-reducer";


/**
 * "The function returns an error that would occur if the tile were placed at the given row and
 * column."
 * 
 * The function takes in a tile, row, and column and returns a boolean
 * @returns A function that takes in a tile, row, and column and returns a boolean.
 */
export const useValidatePlacement = () => {
    const board = useBoard();
    const { settingsGame: { boardSize } } = useGameInfo();
    const dispatchToast = useToastDispatch();


    /**
     * GetTile() returns the tile at the specified row and column.
     * @param {number} row - The row of the tile you want to get.
     * @param {number} col - number - The column of the tile you want to get.
     * @returns The tile at the given row and column.
     */
    const getTile = ( row: number, col: number ) => {
        return board[ row ][ col ];
    };


    /**
     * "The function returns an error that would occur if the tile
     * were placed at the given row and column."
     * 
     * @param {Tile} tile - Tile - The tile that is being placed on the board
     * @param {number} row - number, col: number
     * @param {number} col - number - the column of the tile to be placed
     * @returns A function that takes in a tile, row, and column and returns a boolean.
     */
    const validatePlacement = ( tile: Tile, row: number, col: number ) => {
        if ( getTile( row, col ) !== null ) {
            dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'There is already a tile placed at this location',
                    type: ToastType.ERROR
                }
            } );
            return false;
        }


        const neighborsTiles = VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( col ),
            maxRows: Number( boardSize ), maxColumns: Number( boardSize )
        } );


        if ( neighborsTiles.every( ( nt ) => getTile( nt[ 0 ], nt[ 1 ] ) === null ) ) {
            dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'This tile must be surrounded by at least one other tile',
                    type: ToastType.ERROR
                }
            } );
            return false;
        }


        if ( tile.type === TileType.ROAD &&
            neighborsTiles.every( ( nt ) => getTile( nt[ 0 ], nt[ 1 ] )?.type !== tile.type )
        ) {
            dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'The Road-type tile must be adjacent to at least one other Road-type tile.',
                    type: ToastType.ERROR
                }
            } );
            return false;
        }

        return true;
    };


    return { validatePlacement };
};