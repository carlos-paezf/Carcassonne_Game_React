import { TILES_PER_HAND, ToastType } from "../constants";
import { useBoardDispatch } from "../reducer/board-reducer";
import { useGameInfoDispatch } from "../reducer/game-reducer";
import { useToastDispatch } from '../reducer/toast-reducer';


/**
 * It's a hook function that returns an object with a function called startGame.
 * @returns An object with a startGame function.
 */
export const useStartGame = () => {
    const dispatchGameInfo = useGameInfoDispatch();
    const dispatchToast = useToastDispatch();
    const dispatchBoard = useBoardDispatch();

    /**
     * "If the board size is not a number or is less than 3, dispatch a toast with an error message,
     * otherwise if the board size is even, dispatch a toast with an error message, otherwise dispatch
     * a game info action with a payload of the tiles in the deck, the player name, and the board size,
     * then dispatch a board action with a payload of the board size, then dispatch a toast with a
     * success message."
     * 
     * @param {number} boardSize - number - the size of the board
     * @param {string} playerName - string - the name of the player
     * @returns the dispatch function.
     */
    const startGame = ( boardSize: number, playerName: string ) => {
        if ( !boardSize || boardSize < 3 ) return dispatchToast( {
            type: 'addToast',
            payload: {
                message: 'Board size is required and must be greater than or equal to 3',
                type: ToastType.ERROR
            }
        } );

        if ( boardSize % 2 === 0 ) return dispatchToast( {
            type: 'addToast',
            payload: {
                message: 'The size of the board to be odd',
                type: ToastType.ERROR
            }
        } );

        dispatchGameInfo( {
            type: 'startGame',
            payload: {
                tilesInDeck: boardSize ** 2 - ( TILES_PER_HAND ) - 1,
                settingsGame: { playerName, boardSize },
            }
        } );

        dispatchBoard( {
            type: 'createBoard',
            payload: {
                size: boardSize
            }
        } );

        dispatchToast( {
            type: 'addToast',
            payload: {
                message: `${ playerName }, you have started a new game`,
                type: ToastType.SUCCESS
            }
        } );
    };

    return { startGame };
};