import { ToastType } from "../constants";
import { useGameInfoDispatch } from "../reducer/game-reducer";
import { useToastDispatch } from '../reducer/toast-reducer';


/**
 * It's a hook function that returns an object with a function called startGame.
 * @returns An object with a startGame function.
 */
export const useStartGame = () => {
    const dispatchGameInfo = useGameInfoDispatch();
    const dispatchToast = useToastDispatch();

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
            type: 'playGame',
            payload: {
                numberDiscards: 5,
                tilesInDeck: boardSize ** 2 - 4,
                settingsGame: { playerName, boardSize },
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