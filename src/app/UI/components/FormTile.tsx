import { FC, FormEvent, useContext } from "react";
import { BoardContext, GameInfoContext } from "../../deprecated/context";
import { Tile } from "../../game-logic/tile";
import { useForm } from "../../hooks/useForm";
import { ICoordTile } from "../../types";


type Props = {
    tile: Tile;
};


export const FormTile: FC<Props> = ( { tile } ) => {
    const { gameInfo: { settingsGame: { boardSize } } } = useContext( GameInfoContext );
    const { updateBoard } = useContext( BoardContext );

    const { handleChange, posX, posY } = useForm<ICoordTile>( {
        posX: 0,
        posY: 0
    } );

    const handlePlayTile = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        updateBoard( tile, posX, posY );
    };

    return (
        <div className="form-tile">
            <form className="place-tile" onSubmit={ handlePlayTile }>
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="posX">Input the X coord</label>
                        <input type="number" name="posX" id="posX" value={ posX } onChange={ handleChange } min="0" max={ boardSize - 1 } />
                    </div>

                    <div className="form-control">
                        <label htmlFor="posY">Input the Y coord</label>
                        <input type="number" name="posY" id="posY" value={ posY } onChange={ handleChange } min="0" max={ boardSize - 1 } />
                    </div>
                </div>

                <button>Play tile</button>
            </form>
        </div>
    );
};