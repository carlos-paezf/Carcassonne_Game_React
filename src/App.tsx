import { useState } from 'react';
import './App.css';

import { Board } from './app/UI/components/Board';
import { EndGame } from './app/UI/components/EndGame';
import { FormTile } from './app/UI/components/FormTile';
import { GameInfo } from './app/UI/components/GameInfo';
import { Hand } from './app/UI/components/Hand';
import { Header } from './app/UI/components/Header';
import { ToastContainer } from './app/UI/components/Toasts';
import { FormTileContext } from './app/context/form-tile-context';
import { useGameInfo } from './app/reducer/game-reducer';
import { ITile } from './app/types';


function App () {
    const [ formTileIsVisible, setFormTileIsVisible ] = useState( false );
    const [ selectedTile, setSelectedTile ] = useState<ITile>();
    const { tilesInDeck, turn } = useGameInfo();

    return (
        <FormTileContext.Provider value={ { isVisible: formTileIsVisible, setIsVisible: setFormTileIsVisible, selectedTile, setSelectedTile } }>
            <div className="App">
                <Header />
                <GameInfo />
                {
                    !( tilesInDeck === 0 && turn === 0 ) && <>
                        <Hand />
                        <Board />
                        <EndGame />
                    </>
                }
                <FormTile />
                <ToastContainer />
            </div>
        </FormTileContext.Provider>
    );
}


export default App;
