import { IncrementType, TilePoint, TileType } from "../constants";
import { useTileAndNeighborhood } from "./useTileAndNeighborhood";


export const useIncreasePoints = () => {
    const { getTile, getNeighborhood } = useTileAndNeighborhood();

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
                    if ( getTile( nt[ 0 ], nt[ 1 ] )?.type === TileType.CITY ) score += TilePoint.CHAIN;
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