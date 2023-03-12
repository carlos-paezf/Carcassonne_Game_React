import { FC, useEffect } from "react";
import { useDiscardHand } from "../../hooks/useDiscardHand";
import { useHand, useHandDispatch } from "../../reducer/hand-reducer";
import { TileComponent } from "./Tile";
import { useGameInfo } from "../../reducer/game-reducer";
import { TILES_PER_HAND } from "../../constants";


export const Hand: FC = () => {
    const hand = useHand();
    const dispatchHand = useHandDispatch();
    const { discardHand } = useDiscardHand();
    const { turn, lastTurnDiscarded, tilesInDeck, settingsGame: { boardSize } } = useGameInfo();


    const handleDiscardHand = () => {
        return discardHand();
    };

    const restartHand = () => {
        if ( turn === 0 ) dispatchHand( { type: 'initialHand' } );
    };


    useEffect( () => {
        restartHand();
    }, [ turn, boardSize ] );

    return (
        <div className="hand">
            <div className="tiles">
                {
                    hand.map( tile => <TileComponent key={ tile.idx } tile={ tile.tile } idx={ tile.idx } /> )
                }
            </div>
            {
                ( ( turn - lastTurnDiscarded ) >= 5 && ( tilesInDeck >= TILES_PER_HAND ) )
                && <button className="btn-danger" onClick={ handleDiscardHand }>Discard Hand</button>
            }
        </div>
    );
};
