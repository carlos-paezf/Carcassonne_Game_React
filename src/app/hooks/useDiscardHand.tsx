import { TILES_PER_HAND, ToastType } from "../constants";
import { useGameInfo, useGameInfoDispatch } from "../reducer/game-reducer";
import { useHandDispatch } from "../reducer/hand-reducer";
import { useToastDispatch } from "../reducer/toast-reducer";


/**
 * It's a hook that allows a user to discard their hand
 * @returns An object with a function called discardHand.
 */
export const useDiscardHand = () => {
    const dispatchHand = useHandDispatch();
    const dispatchToast = useToastDispatch();
    const { numberDiscards, tilesInDeck, turn } = useGameInfo();
    const dispatchGameInfo = useGameInfoDispatch();

    const discardHand = () => {
        if ( numberDiscards === 0 ) {
            return dispatchToast( {
                type: 'addToast',
                payload: {
                    message: 'You cannot discard your current hand. You already used the maximum amount of discards',
                    type: ToastType.ERROR
                }
            } );
        }

        if ( tilesInDeck < TILES_PER_HAND ) {
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
            type: 'discardHand',
            payload: {
                tilesInDeck: tilesInDeck - TILES_PER_HAND,
                turn: turn + 1,
                numberDiscards: numberDiscards - 1
            }
        } );
    };

    return { discardHand };
};