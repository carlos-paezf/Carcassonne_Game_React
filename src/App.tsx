import { useState } from 'react';
import './App.css';

import { Board } from './app/UI/components/Board';
import { FormTile } from './app/UI/components/FormTile';
import { GameInfo } from './app/UI/components/GameInfo';
import { Hand } from './app/UI/components/Hand';
import { Header } from './app/UI/components/Header';
import { ToastContainer } from './app/UI/components/Toasts';
import { FormTileContext } from './app/context/form-tile-context';
import { ITile } from './app/types';
import { useGameInfo } from './app/reducer/game-reducer';


function App () {
    const [ isVisible, setIsVisible ] = useState( false );
    const [ selectedTile, setSelectedTile ] = useState<ITile>();
    const { tilesInDeck, turn } = useGameInfo();

    return (
        <FormTileContext.Provider value={ { isVisible, setIsVisible, selectedTile, setSelectedTile } }>
            <div className="App">
                <Header />
                <GameInfo />

                {
                    !( tilesInDeck === 0 && turn === 0 ) && <>
                        <Hand />
                        <Board />
                    </>
                }

                <FormTile />
                <ToastContainer />
            </div>
        </FormTileContext.Provider>
    );
}


export default App;
