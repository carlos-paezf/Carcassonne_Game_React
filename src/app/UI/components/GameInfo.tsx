import { FC } from "react";
import { useGameInfo } from "../../reducer/game-reducer";


/**
 * It's a React component that displays the game information
 * @returns A table with the game info.
 */
export const GameInfo: FC = () => {
    const gameInfo = useGameInfo();

    return (
        <table className="game-info">
            <thead>
                <tr>
                    <th>Tiles in Deck</th>
                    <th>Actual Turn</th>
                    <th>Number of discards remaining</th>
                    <th>Score</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{ gameInfo.tilesInDeck }</td>
                    <td>{ gameInfo.turn }</td>
                    <td>{ gameInfo.numberDiscards }</td>
                    <td>{ gameInfo.score }</td>
                </tr>
            </tbody>
        </table>
    );
};