import { FormEvent } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useStartGame } from '../../../hooks/useStartGame';
import { ISettingsGameType } from '../../../types';


export const Header = () => {
    const { startGame } = useStartGame();


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

        return startGame( boardSize, playerName );
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