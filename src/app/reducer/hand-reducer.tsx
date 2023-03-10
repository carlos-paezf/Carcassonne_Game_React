import { FC, createContext, useContext, useReducer } from "react";
import { TILES_PER_HAND } from "../constants";
import { Tile } from "../game-logic/tile";
import { IHand, IReducerAction, Props } from "../types";
import { useToastDispatch } from "./toast-reducer";


const HandContext = createContext<IHand[]>( [] );
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
    [ key: string ]: ( object: IHand[], payload: IHandPayload ) => IHand[];
}


const actionHandlers: IActionHandlers = {
    initialHand: ( _, payload ) => {
        const hand: IHand[] = [];
        for ( let i = 0; i < TILES_PER_HAND; i++ ) {
            hand.push( { id: i, tile: Tile.generateTile() } );
        }
        return hand;
    },

    playTile: ( hand, payload ) => {
        return hand.filter( tile => tile.id !== payload.indexTile );
    },

    appendTileToHand: ( hand, payload ) => {
        if ( payload.tilesInDeck === 0 ) throw new Error( 'There are no more cards to play' );

        let maxIdx = 0;

        hand.forEach( tile => {
            maxIdx = ( tile.id > maxIdx ) ? tile.id : maxIdx;
        } );

        return [ ...hand, { id: maxIdx + 1, tile: Tile.generateTile() } ];
    },

    discardHand: ( hand, payload ) => {
        hand = [];
        for ( let i = 0; i < TILES_PER_HAND; i++ ) {
            hand.push( { id: i, tile: Tile.generateTile() } );
        }
        return hand;
    }
};


/**
 * "If the action type is not found in the actionHandlers object, throw an error. Otherwise, return the
 * result of calling the handler function with the hand and payload arguments."
 * 
 * The actionHandlers object is defined as follows:
 * @param {IHand[]} hand - IHand[]
 * @param action - IReducerAction<IHandPayload>
 * @returns The return value of the handler function.
 */
function handReducer ( hand: IHand[], action: IReducerAction<IHandPayload> ) {
    const handler = actionHandlers[ action.type ];

    if ( !handler ) {
        throw new Error( `Unhandled action type ${ action.type }` );
    }

    return handler( hand, action.payload );
}