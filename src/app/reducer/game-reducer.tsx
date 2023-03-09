import { FC, createContext, useContext, useReducer } from "react";
import { initialGameInfo } from "../constants";
import { IActionHandlers, IGameInfo, IReducerAction, Props } from "../types";


const GameInfoContext = createContext<IGameInfo>( initialGameInfo );
const GameInfoDispatchContext = createContext<any>( null );


/**
 * It returns the value of the GameInfoContext
 */
export const useGameInfo = () => useContext( GameInfoContext );
/**
 * It returns the dispatch function from the GameInfoDispatchContext
 */
export const useGameInfoDispatch = () => useContext( GameInfoDispatchContext );


export const GameProvider: FC<Props> = ( { children } ) => {
    const [ gameInfo, dispatch ] = useReducer( gameInfoReducer, initialGameInfo );

    return (
        <GameInfoContext.Provider value={ gameInfo }>
            <GameInfoDispatchContext.Provider value={ dispatch }>
                { children }
            </GameInfoDispatchContext.Provider>
        </GameInfoContext.Provider>
    );
};


/* An object with keys that are strings and values that are functions. */
const actionHandlers: IActionHandlers<IGameInfo> = {
    playGame: ( gameInfo, payload ) => ( {
        ...gameInfo,
        tilesInDeck: payload.tilesInDeck!,
        settingsGame: payload.settingsGame!
    } ),
    updateTilesInDeck: ( gameInfo, payload ) => ( {
        ...gameInfo,
        tilesInDeck: payload.tilesInDeck!
    } ),
    updateTurn: ( gameInfo, payload ) => ( {
        ...gameInfo,
        turn: payload.turn!
    } ),
    updateNumberOfDiscards: ( gameInfo, payload ) => ( {
        ...gameInfo,
        numberDiscards: payload.numberDiscards!
    } ),
    updateScore: ( gameInfo, payload ) => ( {
        ...gameInfo,
        score: payload.score!
    } )
};


/**
 * It takes a gameInfo object and an action object, and returns a new gameInfo object
 * @param {IGameInfo} gameInfo - IGameInfo - This is the current state of the game.
 * @param {IGameReducerAction} action - IGameReducerAction
 * @returns The return value of the handler function.
 */
function gameInfoReducer ( gameInfo: IGameInfo, action: IReducerAction<IGameInfo> ) {
    const handler = actionHandlers[ action.type ];

    if ( !handler ) {
        throw new Error( `Unhandled action type ${ action.type }` );
    }

    return handler( gameInfo, action.payload );
}