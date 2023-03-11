import { FC, useEffect } from "react";
import { useDiscardHand } from "../../../hooks/useDiscardHand";
import { useGameInfo } from "../../../reducer/game-reducer";
import { useHand, useHandDispatch } from "../../../reducer/hand-reducer";
import { TileComponent } from "../tile/tile";


export const Hand: FC = () => {
    const hand = useHand();
    const dispatchHand = useHandDispatch();
    const { numberDiscards, tilesInDeck } = useGameInfo();
    const { discardHand } = useDiscardHand();


    const handleDiscardHand = () => {
        return discardHand();
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
