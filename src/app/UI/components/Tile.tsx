import { FC, useContext } from "react";
import { ITile } from "../../types";
import { FormTileContext } from "../../context/form-tile-context";


export const TileComponent: FC<ITile> = ( tile ) => {
    const { setSelectedTile, setIsVisible } = useContext( FormTileContext );

    const handleOpenFormTile = () => {
        setIsVisible( true );
        setSelectedTile( tile );
    };

    return (
        <button className={ `tile btn ${ tile.tile.type } ${ tile.tile.direction || '' }` } id={ `${ tile.idx }` } onClick={ handleOpenFormTile }>{ tile.tile.toString }</button>
    );
};