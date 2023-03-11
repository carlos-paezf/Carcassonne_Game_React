import { FC, useEffect } from "react";
import { useDiscardHand } from "../../hooks/useDiscardHand";
import { useHand, useHandDispatch } from "../../reducer/hand-reducer";
import { TileComponent } from "./Tile";


export const Hand: FC = () => {
    const hand = useHand();
    const dispatchHand = useHandDispatch();
    const { discardHand } = useDiscardHand();


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
            <button onClick={ handleDiscardHand }>Discard Hand</button>
        </div>
    );
};
