import { FC } from "react";
import { Tile } from "../../game-logic/tile";


type ColumnProps = {
    tile: Tile | null;
    row: number;
    col: number;
};


/**
 * The Column component is a function that takes in a tile, row, and col and returns a table cell with
 * the tile's value or the row and col if there is no tile
 * @param  - `tile` is the tile object that is in the column.
 * @returns A React component.
 */
export const Column: FC<ColumnProps> = ( { tile, row, col } ) => {
    return (
        <td className={ `column ${ tile ? 'fill' : 'empty' }` }>
            { tile ? tile.toString : `(${ row },${ col })` }
        </td>
    );
};