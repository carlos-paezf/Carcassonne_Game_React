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
    const { lastTurnDiscarded, numberDiscards, tilesInDeck, turn } = useGameInfo();
    const dispatchGameInfo = useGameInfoDispatch();

    const discardHand = () => {
        if ( ( turn - lastTurnDiscarded ) < 5 ) {
            return dispatchToast( {
                type: 'addToast',
                payload: {
                    message: "You cannot discard your current hand. It hasn't been 5 turns to discard your hand again",
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

        dispatchHand( { type: 'discardHand' } );

        dispatchGameInfo( {
            type: 'discardHand',
            payload: {
                tilesInDeck: tilesInDeck - TILES_PER_HAND,
                numberDiscards: numberDiscards + 1,
                lastTurnDiscarded: turn,
                turn: turn + 1,
            }
        } );
    };

    return { discardHand };
};