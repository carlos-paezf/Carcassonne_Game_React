import { FC, createContext, useContext, useReducer } from "react";
import { TILES_PER_HAND } from "../constants";
import { Tile } from "../game-logic/tile";
import { ITile, IReducerAction, Props } from "../types";
import { useToastDispatch } from "./toast-reducer";


const HandContext = createContext<ITile[]>( [] );
const HandDispatchContext = createContext<any>( null );


/**
 * It returns the value of the HandContext
 */
export const useHand = () => useContext( HandContext );
/**
 * It returns the dispatch function from the HandDispatchContext
 */
export const useHandDispatch = () => useContext( HandDispatchContext );


export const HandProvider: FC<Props> = ( { children } ) => {
    const [ hand, dispatch ] = useReducer( handReducer, [] );

    return (
        <HandContext.Provider value={ hand }>
            <HandDispatchContext.Provider value={ dispatch }>
                { children }
            </HandDispatchContext.Provider>
        </HandContext.Provider>
    );
};


interface IHandPayload {
    tilesInDeck?: number;
    numberDiscards?: number;
    indexTile?: number;
}


interface IActionHandlers {
    [ key: string ]: ( object: ITile[], payload: IHandPayload ) => ITile[];
}


const actionHandlers: IActionHandlers = {
    initialHand: ( _, payload ) => {
        const hand: ITile[] = [];
        for ( let i = 0; i < TILES_PER_HAND; i++ ) {
            hand.push( { idx: i, tile: Tile.generateTile() } );
        }
        return hand;
    },

    playTile: ( hand, payload ) => {
        return hand.filter( tile => tile.idx !== payload.indexTile );
    },

    appendTileToHand: ( hand, payload ) => {
        if ( payload.tilesInDeck === 0 ) throw new Error( 'There are no more cards to play' );

        let maxIdx = 0;

        hand.forEach( tile => {
            maxIdx = ( tile.idx > maxIdx ) ? tile.idx : maxIdx;
        } );

        return [ ...hand, { idx: maxIdx + 1, tile: Tile.generateTile() } ];
    },

    discardHand: ( hand, payload ) => {
        hand = [];
        for ( let i = 0; i < TILES_PER_HAND; i++ ) {
            hand.push( { idx: i, tile: Tile.generateTile() } );
        }
        return hand;
    }
};


/**
 * "If the action type is not found in the actionHandlers object, throw an error. Otherwise, return the
 * result of calling the handler function with the hand and payload arguments."
 * 
 * The actionHandlers object is defined as follows:
 * @param {ITile[]} hand - IHand[]
 * @param action - IReducerAction<IHandPayload>
 * @returns The return value of the handler function.
 */
function handReducer ( hand: ITile[], action: IReducerAction<IHandPayload> ) {
    const handler = actionHandlers[ action.type ];

    if ( !handler ) {
        throw new Error( `Unhandled action type ${ action.type }` );
    }

    return handler( hand, action.payload );
}