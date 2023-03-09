import { FC, useEffect } from 'react';
import { useBoard, useBoardDispatch } from '../../../reducer/board-reducer';
import { useGameInfo } from '../../../reducer/game-reducer';
import { Column } from './Column';


export const Board: FC = () => {
    const { settingsGame: { boardSize } } = useGameInfo();
    const dispatch = useBoardDispatch();
    const board = useBoard();


    useEffect( () => {
        dispatch( {
            type: 'createBoard',
            payload: {
                size: boardSize
            }
        } );
    }, [ boardSize ] );


    return (
        <table className="board-game">
            <tbody>
                { board.map( ( row, idxRow ) =>
                    <tr key={ idxRow }>
                        { row.map( ( col, idxCol ) =>
                            <Column key={ idxCol } tile={ col } row={ idxRow } col={ idxCol } />
                        ) }
                    </tr>
                ) }
            </tbody>
        </table>
    );
};