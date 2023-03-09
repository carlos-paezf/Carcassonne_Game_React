import { FormEvent } from 'react';
import { ToastType } from '../../../constants';
import { useForm } from '../../../hooks/useForm';
import { useGameInfoDispatch } from '../../../reducer/game-reducer';
import { useToastDispatch } from '../../../reducer/toast-reducer';
import { ISettingsGameType } from '../../../types';


export const Header = () => {
    const dispatchGameInfo = useGameInfoDispatch();
    const dispatchToast = useToastDispatch();


    const { handleChange, playerName, boardSize } = useForm<ISettingsGameType>( {
        playerName: 'Player',
        boardSize: 11
    } );


    /**
     * "The function handleStartGame is a function that takes an event of type FormEvent and returns
     * nothing."
     * 
     * The FormEvent type is a built-in type in TypeScript. It's a type that represents an event that
     * is fired from a form element
     * @param e - FormEvent<HTMLFormElement> - this is the event that is triggered when the form is
     * submitted.
     * @returns the value of the function.
     */
    const handleStartGame = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

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
                tilesInDeck: boardSize ** 2,
                settingsGame: { playerName, boardSize }
            }
        } );

        dispatchToast( {
            type: 'addToast',
            payload: {
                message: `${ playerName }!!!, you have started a new game`,
                type: ToastType.SUCCESS
            }
        } );
    };

    return (
        <form className="settings-form" onSubmit={ handleStartGame }>
            <div className="form-group">
                <div className="form-control">
                    <label htmlFor="player-name">Player Name:</label>
                    <input id="player-name" type="text" name="playerName" value={ playerName } onChange={ handleChange } />
                </div>

                <div className="form-control">
                    <label htmlFor="board-size">Board Size</label>
                    <input type="number" min="3" name="boardSize" value={ boardSize } onChange={ handleChange } />
                </div>
            </div>

            <button>Start Game</button>
        </form>
    );
};