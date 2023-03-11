import { FC } from "react";
import { ITile } from "../../types";


export const TileComponent: FC<ITile> = ( { idx, tile } ) => {
    return (
        <button className="tile btn" id={ `${ idx }` }>{ tile.toString }</button>
    );
};