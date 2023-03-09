import { FC } from "react";
import { Tile } from "../../../game-logic/tile";


type TileProps = {
    tile: Tile;
    index: number;
};


export const TileComponent: FC<TileProps> = ( { tile, index } ) => {
    return (
        <button className="tile btn" id={ `${ index }` }>{ tile.toString }</button>
    );
};