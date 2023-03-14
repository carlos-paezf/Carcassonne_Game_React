import { IncrementType, TilePoint, TileType } from "../constants";
import { useTileAndNeighborhood } from "./useTileAndNeighborhood";


export const useIncreasePoints = () => {
    const { getTile, getNeighborhood } = useTileAndNeighborhood();

    /**
     * The increasePoints function uses the getNeighborhood function to get the neighbors of a tile 
     * based on the row and col arguments. Then, based on the value of the incrementType argument, 
     * the function checks each tile in the neighborhood and adds to the score variable 
     * if it meets certain conditions. Finally, the function returns the score variable.
     * 
     * The function is a bit more complicated than that, but that's the gist of it
     * @param incrementType - keyof typeof IncrementType
     * @param {number} row - number, col: number
     * @param {number} col - number - the column of the tile
     * @returns a number.
     */
    const increasePoints = ( incrementType: keyof typeof IncrementType, row: number, col: number ): number => {
        const tilesNeighborhood = getNeighborhood(
            row, col,
            incrementType === IncrementType.ABBEY_NEIGHBORHOOD ||
            incrementType === IncrementType.BY_NEIGHBORING_ABBEY
        );

        let score = 0;

        switch ( incrementType ) {
            case IncrementType.BY_NEIGHBORING_ABBEY:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.ABBEY ) score += TilePoint.ABBEY;
                } );
                break;

            case IncrementType.BY_CITY_CHAIN:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.CITY ) {
                        const isNewChain = getNeighborhood( nt[ 0 ], nt[ 1 ] )
                            .every( nc => getTile( nc[ 0 ], nc[ 1 ] )?.type !== TileType.CITY );
                        if ( isNewChain ) score += TilePoint.CHAIN;

                        score += TilePoint.CHAIN;
                    };
                } );
                break;

            case IncrementType.ABBEY_NEIGHBORHOOD:
                tilesNeighborhood.forEach( ( nt ) => {
                    if ( getTile( nt[ 0 ], nt[ 1 ] ) ) score += TilePoint.ABBEY;
                } );

            default:
                break;
        }

        return score;
    };


    /**
     * This function calculates the score for a given tile based on its type, row and column position, 
     * and the neighboring tiles. The score is calculated differently for each tile type, 
     * and the calculation involves adding various point values defined in the TilePoint enum 
     * and calling the increasePoints function with different IncrementType values. 
     * The final score is returned as an integer value.
     * 
     * @param tileType - keyof typeof TileType. A string value representing the type of tile, with possible values defined in the TileType enum.
     * @param {number} row - number - An integer value representing the row position of the tile.
     * @param {number} col - number - An integer value representing the column position of the tile.
     * @returns The score of the tile.
     */
    const updateScore = ( tileType: keyof typeof TileType, row: number, col: number ) => {
        let score = 0;

        switch ( tileType ) {
            case TileType.ROAD:
                score += TilePoint.ROAD;
                score += increasePoints( IncrementType.BY_NEIGHBORING_ABBEY, row, col );
                break;

            case TileType.CITY:
                score += TilePoint.CITY;
                score += increasePoints( IncrementType.BY_CITY_CHAIN, row, col );
                score += increasePoints( IncrementType.BY_NEIGHBORING_ABBEY, row, col );
                break;

            case TileType.ABBEY:
                score += increasePoints( IncrementType.ABBEY_NEIGHBORHOOD, row, col );
                break;

            default:
                break;
        }

        return score;
    };


    return { updateScore };
};