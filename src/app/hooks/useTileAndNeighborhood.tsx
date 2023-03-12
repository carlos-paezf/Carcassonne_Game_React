import { VonNeumannNeighborhoods } from "../game-logic/von-neumann-neighborhoods";
import { useBoard } from "../reducer/board-reducer";
import { useGameInfo } from "../reducer/game-reducer";


export const useTileAndNeighborhood = () => {
    const board = useBoard();
    const { settingsGame: { boardSize } } = useGameInfo();

    /**
     * GetTile() returns the tile at the specified row and column.
     * @param {number} row - The row of the tile you want to get.
     * @param {number} col - number - The column of the tile you want to get.
     * @returns The tile at the given row and column.
     */
    const getTile = ( row: number, col: number ) => {
        return board[ row ][ col ];
    };

    /**
     * "Given a row and column, return the Von Neumann neighborhood of that cell."
     * 
     * @param {number} row - number - the row of the cell
     * @param {number} col - number - the column of the cell
     * @returns An array of objects
     */
    const getNeighborhood = ( row: number, col: number ) => {
        return VonNeumannNeighborhoods.getNeighborhood( {
            row: Number( row ), column: Number( col ),
            maxRows: Number( boardSize ), maxColumns: Number( boardSize )
        } );
    };

    return { getTile, getNeighborhood };
};