import { FC, FormEvent, useContext } from 'react';
import { FormTileContext } from "../../context/form-tile-context";
import { useForm } from "../../hooks/useForm";
import { usePlayTile } from "../../hooks/usePlayTile";
import { useGameInfo } from "../../reducer/game-reducer";
import { ICoordTile } from "../../types";


export const FormTile: FC = () => {
    const { isVisible, setIsVisible, selectedTile } = useContext( FormTileContext );
    const { settingsGame: { boardSize } } = useGameInfo();
    const { playTile } = usePlayTile();

    const { handleChange, posX, posY } = useForm<ICoordTile>( {
        posX: 0, posY: 0
    } );

    const handlePlayTile = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        playTile( selectedTile!.idx, selectedTile!.tile, posX, posY );
        setIsVisible( false );
    };

    if ( !isVisible || !selectedTile ) return <></>;

    return (
        <div className="form-tile">
            <form className="place-tile" id="place-tile" onSubmit={ handlePlayTile }>
                <i id="close" className="far fa-times-circle" onClick={ () => setIsVisible( false ) }></i>

                <h3>Tile selected: { selectedTile.tile.toString }</h3>

                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="posX">Input the X coord:</label>
                        <input type="number" name="posX" id="posX" value={ posX } onChange={ handleChange } min="0" max={ boardSize - 1 } />
                    </div>

                    <div className="form-control">
                        <label htmlFor="posY">Input the Y coord:</label>
                        <input type="number" name="posY" id="posY" value={ posY } onChange={ handleChange } min="0" max={ boardSize - 1 } />
                    </div>
                </div>

                <button>Play tile</button>
            </form>
        </div>
    );
};