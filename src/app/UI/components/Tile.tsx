import { FC, useContext } from "react";
import { FormTileContext } from "../../context/form-tile-context";
import { ITile } from "../../types";


export const TileComponent: FC<ITile> = ( tile ) => {
    const { setSelectedTile, setIsVisible } = useContext( FormTileContext );

    const handleOpenFormTile = () => {
        setIsVisible( true );
        setSelectedTile( tile );
    };

    return (
        <button className={ `tile btn ${ tile.tile.type } ${ tile.tile.direction || '' }` } id={ `${ tile.idx }` } onClick={ handleOpenFormTile }>
            { tile.tile.toString }
        </button>
    );
};