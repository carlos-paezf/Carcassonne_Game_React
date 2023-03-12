import { FC, useEffect } from "react";
import { useDiscardHand } from "../../hooks/useDiscardHand";
import { useHand, useHandDispatch } from "../../reducer/hand-reducer";
import { TileComponent } from "./Tile";
import { useGameInfo } from "../../reducer/game-reducer";


export const Hand: FC = () => {
    const hand = useHand();
    const dispatchHand = useHandDispatch();
    const { discardHand } = useDiscardHand();
    const { turn, lastTurnDiscarded } = useGameInfo();


    const handleDiscardHand = () => {
        return discardHand();
    };


    useEffect( () => {
        dispatchHand( {
            type: 'initialHand',
            payload: {}
        } );
    }, [] );

    return (
        <div className="hand">
            <div className="tiles">
                {
                    hand.map( tile => <TileComponent key={ tile.idx } tile={ tile.tile } idx={ tile.idx } /> )
                }
            </div>
            {
                ( ( turn - lastTurnDiscarded ) >= 5 ) && <button className="btn-danger" onClick={ handleDiscardHand }>Discard Hand</button>
            }
        </div>
    );
};
