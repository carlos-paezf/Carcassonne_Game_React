import { FormEvent, useContext } from 'react';
import { GameInfoContext } from '../../../app/context';
import { useForm } from '../../../app/hooks/useForm';
import { SettingsGameType } from '../../../app/types';


export const Header = () => {
    const { gameInfo, setGameInfo } = useContext( GameInfoContext );

    const { handleChange, playerName, boardSize } = useForm<SettingsGameType>( {
        playerName: '',
        boardSize: 0
    } );

    const handleStartGame = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        setGameInfo( {
            ...gameInfo,
            tilesInDeck: boardSize ** 2
        } );
    };

    return (
        <form className="settings-form" onSubmit={ handleStartGame }>
            <div>
                <label htmlFor="player-name">Player Name:</label>
                <input id="player-name" type="text" name="playerName" value={ playerName } onChange={ handleChange } />
            </div>

            <div>
                <label htmlFor="board-size">Board Size</label>
                <input type="number" min="0" name="boardSize" value={ boardSize } onChange={ handleChange } />
            </div>

            <button>Start Game</button>
        </form>
    );
};