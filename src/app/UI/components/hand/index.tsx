import { FC, useEffect } from "react";
import { useGameInfo, useGameInfoDispatch } from "../../../reducer/game-reducer";
import { useHand, useHandDispatch } from "../../../reducer/hand-reducer";
import { useToastDispatch } from "../../../reducer/toast-reducer";
import { TileComponent } from "../tile/tile";
import { TILES_PER_HAND, ToastType } from "../../../constants";


export const Hand: FC = () => {
    // const { hand, discardHand } = useContext( HandContext );
    const hand = useHand();
    const dispatchHand = useHandDispatch();
    const dispatchToast = useToastDispatch();
    const { numberDiscards, tilesInDeck, turn } = useGameInfo();
    const dispatchGameInfo = useGameInfoDispatch();


    const handleDiscardHand = () => {
        if ( numberDiscards === 0 ) {
            return dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'You cannot discard your current hand. You already used the maximum amount of discards',
                    type: ToastType.ERROR
                }
            } );
        }

        if ( tilesInDeck! < TILES_PER_HAND ) {
            return dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'You cannot discard your current hand. There are not enough cards to distribute a new hand.',
                    type: ToastType.ERROR
                }
            } );
        }

        dispatchHand( {
            type: 'discardHand',
            payload: {
                numberDiscards,
                tilesInDeck
            }
        } );

        dispatchGameInfo( {
            type: 'updateTilesInDeck',
            payload: {
                tilesInDeck: tilesInDeck - TILES_PER_HAND
            }
        } );

        dispatchGameInfo( {
            type: 'updateTurn',
            payload: {
                turn: turn + 1
            }
        } );

        dispatchGameInfo( {
            type: 'updateNumberOfDiscards',
            payload: {
                numberDiscards: numberDiscards - 1
            }
        } );
    };

    useEffect( () => {
        dispatchHand( {
            type: 'initialHand',
            payload: {
                numberDiscards,
                tilesInDeck
            }
        } );
    }, [] );

    return (
        <div className="hand">
            <div className="tiles">
                {
                    hand.map( tile => <TileComponent key={ tile.idx } tile={ tile.tile } idx={ tile.idx } /> )
                }
            </div>
            <button onClick={ handleDiscardHand }>Discard Hand</button>
        </div>
    );
};
