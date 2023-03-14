import { ToastType } from "../constants";
import { Tile } from "../game-logic/tile";
import { useBoardDispatch } from "../reducer/board-reducer";
import { useGameInfo, useGameInfoDispatch } from "../reducer/game-reducer";
import { useHandDispatch } from "../reducer/hand-reducer";
import { useToastDispatch } from "../reducer/toast-reducer";
import { useIncreasePoints } from "./useIncreasePoints";
import { useValidatePlacement } from "./useValidatePlacement";


/**
 * PlayTile is a function that takes in an indexTile, a tile, a row, and a col, and then dispatches a
 * playTile action to the board, hand, and gameInfo reducers, and then decrements the tilesInDeck and
 * increments the turn.
 * 
 * @returns The playTile function is being returned.
 */
export const usePlayTile = () => {
    const { tilesInDeck, tilesPlayed, turn, score } = useGameInfo();
    const dispatchBoard = useBoardDispatch();
    const dispatchHand = useHandDispatch();
    const dispatchToast = useToastDispatch();
    const gameInfoDispatch = useGameInfoDispatch();
    const { validatePlacement } = useValidatePlacement();
    const { updateScore } = useIncreasePoints();

    /**
     * PlayTile is a function that takes in an indexTile, a tile, a row, and a col, and then dispatches
     * a playTile action to the board, hand, and gameInfo reducers, and then decrements the tilesInDeck
     * and increments the turn.
     * @param {number} indexTile - the index of the tile in the hand array
     * @param {Tile} tile - Tile, row: number, col: number
     * @param {number} row - number, col: number -&gt; the row and column of the tile that was clicked
     * on the board.
     * @param {number} col - number - the column of the tile on the board
     */
    const playTile = ( indexTile: number, tile: Tile, row: number, col: number ) => {
        if ( !validatePlacement( tile, row, col ) ) return;

        dispatchBoard( {
            type: 'playTile',
            payload: {
                tile: { tile, row, col }
            }
        } );

        dispatchHand( {
            type: 'playTile',
            payload: {
                indexTile, tilesInDeck
            }
        } );

        const increaseScore = updateScore( tile.type, row, col );

        gameInfoDispatch( {
            type: 'playTile',
            payload: {
                tilesInDeck: ( tilesInDeck === 0 ) ? 0 : tilesInDeck - 1,
                tilesPlayed: tilesPlayed + 1,
                turn: turn + 1,
                score: score + increaseScore
            }
        } );

        dispatchToast( {
            type: 'addToast',
            payload: {
                message: `+${ increaseScore }`, type: ToastType.INFO, visibilityTime: 3000
            }
        } );
    };

    return { playTile };
};