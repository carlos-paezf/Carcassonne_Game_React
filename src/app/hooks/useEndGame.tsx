import { TILES_PER_HAND, TileType } from "../constants";
import { useBoard } from "../reducer/board-reducer";
import { useGameInfo } from "../reducer/game-reducer";
import { useHand } from "../reducer/hand-reducer";
import { useTileAndNeighborhood } from "./useTileAndNeighborhood";


export const useEndGame = () => {
    const board = useBoard();
    const { tilesInDeck, settingsGame: { boardSize } } = useGameInfo();
    const tilesInHand = useHand();
    const { getTile, getNeighborhood } = useTileAndNeighborhood();


    /**
     * It returns an array of arrays, each of which contains the coordinates of an empty space on the
     * board.
     * @returns An array of arrays.
     */
    const getEmptySpacesOnBoard = () => {
        const spaces = [];

        for ( let i = 0; i < boardSize; i++ ) {
            for ( let j = 0; j < boardSize; j++ ) {
                if ( board[ i ][ j ] === null ) {
                    spaces.push( [ i, j ] );
                }
            }
        }

        return spaces;
    };


    /**
     * "If there is a tile in the neighborhood that is a road, then return true."
     * 
     * The function is called like this:
     * @param {number[][]} neighborhood - number[][]
     * @returns A boolean value.
     */
    const areThereValidMoves = ( neighborhood: number[][] ) => {
        return neighborhood.some( ( nt ) => getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.ROAD );
    };


    /**
     * "If there are no tiles in the deck or in the hand, and there are no valid moves, then the game
     * should end."
     * 
     * @returns a boolean value.
     */
    const shouldEndGame = () => {
        if ( tilesInDeck > 3 || tilesInHand.length > TILES_PER_HAND ) return false;
        if ( tilesInDeck === 0 && tilesInHand.length === 0 ) return true;

        if ( tilesInHand.some( tile => tile.tile.type !== TileType.ROAD ) ) return false;

        for ( const emptySpace of getEmptySpacesOnBoard() ) {
            const neighborhood = getNeighborhood( emptySpace[ 0 ], emptySpace[ 1 ] );

            for ( const tileInHand of tilesInHand ) {
                if ( tileInHand.tile.type === TileType.ROAD ) {
                    if ( areThereValidMoves( neighborhood ) ) return false;
                }
            }
        }

        return true;
    };


    return { shouldEndGame };
};