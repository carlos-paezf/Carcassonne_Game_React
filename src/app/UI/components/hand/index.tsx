import { FC, useContext, useEffect, useState } from "react";
import { HandContext } from "../../../context";
import { TileComponent } from "../tile/tile";


export const Hand: FC = () => {
    const { hand, discardHand } = useContext( HandContext );

    // useEffect( () => {
    // }, [ hand ] );

    return (
        <div className="hand">
            <div className="tiles">
                {
                    hand.map( ( tile, idx ) => <TileComponent key={ idx } tile={ tile } index={ idx } /> )
                }
            </div>
            <button onClick={ discardHand }>Discard Hand</button>
        </div>
    );
};
