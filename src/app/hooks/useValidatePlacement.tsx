import { TileType, ToastType } from "../constants";
import { Tile } from "../game-logic/tile";
import { useToastDispatch } from "../reducer/toast-reducer";
import { useTileAndNeighborhood } from "./useTileAndNeighborhood";


/**
 * "The function returns an error that would occur if the tile were placed at the given row and
 * column."
 * 
 * The function takes in a tile, row, and column and returns a boolean
 * @returns A function that takes in a tile, row, and column and returns a boolean.
 */
export const useValidatePlacement = () => {
    const dispatchToast = useToastDispatch();
    const { getTile, getNeighborhood } = useTileAndNeighborhood();


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


        const neighborsTiles = getNeighborhood( row, col );


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