import { FC, useEffect, useState } from "react";
import { useEndGame } from "../../hooks/useEndGame";
import { useGameInfo } from "../../reducer/game-reducer";


export const EndGame: FC = () => {
    const { numberDiscards, score, tilesPlayed, turn, settingsGame: { boardSize } } = useGameInfo();
    const { shouldEndGame } = useEndGame();
    const [ endGame, setEndGame ] = useState( false );

    useEffect( () => {
        setEndGame( shouldEndGame() );
    }, [ turn, boardSize ] );

    if ( !endGame ) return <></>;

    return (
        <div className="end-game-panel">

            <div className="end-game">
                <i id="close" className="far fa-times-circle" onClick={ () => setEndGame( false ) }></i>
                <h1>End Game</h1>
                <h2>Statistics</h2>

                <table>
                    <tr>
                        <th>Board Size:</th>
                        <th>{ boardSize }</th>
                    </tr>
                    <tr>
                        <th>Score:</th>
                        <th>{ score }</th>
                    </tr>
                    <tr>
                        <th>Turns Played:</th>
                        <th>{ turn }</th>
                    </tr>
                    <tr>
                        <th>Tiles Played:</th>
                        <th>{ tilesPlayed }</th>
                    </tr>
                    <tr>
                        <th>Discards Played:</th>
                        <th>{ numberDiscards }</th>
                    </tr>
                </table>

                <button className="btn-success" onClick={ () => setEndGame( false ) }>Start new game</button>
            </div>
        </div>
    );
};;