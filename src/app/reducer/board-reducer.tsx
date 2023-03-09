import { FC, createContext, useContext, useReducer } from "react";
import { IReducerAction, Props } from "../types";
import { Tile } from "../game-logic/tile";
import { RoadDirection, TileType } from "../constants";

const BoardContext = createContext<( Tile | null )[][]>( [] );
const BoardDispatchContext = createContext<any>( null );


/**
 * It returns the value of the BoardContext
 */
export const useBoard = () => useContext( BoardContext );
/**
 * It returns the dispatch function from the BoardDispatchContext
 */
export const useBoardDispatch = () => useContext( BoardDispatchContext );



export const BoardProvider: FC<Props> = ( { children } ) => {
    const [ board, dispatch ] = useReducer( boardReducer, [] );

    return (
        <BoardContext.Provider value={ board }>
            <BoardDispatchContext.Provider value={ dispatch }>
                { children }
            </BoardDispatchContext.Provider>
        </BoardContext.Provider>
    );
};


interface IBoardPayload {
    size?: number;
    tile?: {
        tile: Tile;
        row: number;
        col: number;
    };
}


export interface IActionHandlers {
    [ key: string ]: ( object: ( Tile | null )[][], payload: IBoardPayload ) => ( Tile | null )[][];
}


const actionHandlers: IActionHandlers = {
    createBoard: ( _, payload ) => {
        const board: ( Tile | null )[][] = [];
        for ( let i = 0; i < payload.size!; i++ ) {
            const row = [];
            for ( let j = 0; j < payload.size!; j++ ) {
                row.push( null );
            }
            board.push( row );
        }

        const middle = Math.floor( payload.size! / 2 );
        board[ middle ][ middle ] = new Tile( TileType.ROAD, RoadDirection.FOUR_WAY );

        return board;
    },
    playTile: ( board, payload ) => {
        board[ payload.tile!.row ][ payload.tile!.col ] = payload.tile!.tile;
        return board;
    }
};


/**
 * It takes a board and an action, and returns a new board
 * @param {( Tile | null )[][]} board - ( Tile | null )[][]
 * @param action - IReducerAction<IBoardPayload>
 * @returns A new board with the new tile added.
 */
function boardReducer ( board: ( Tile | null )[][], action: IReducerAction<IBoardPayload> ) {
    const handler = actionHandlers[ action.type ];

    if ( !handler ) {
        throw new Error( `Unhandled action type ${ action.type }` );
    }

    return handler( board, action.payload );
}