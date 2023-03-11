import { useState } from 'react';
import './App.css';

import { Board } from './app/UI/components/Board';
import { GameInfo } from './app/UI/components/GameInfo';
import { Hand } from './app/UI/components/Hand';
import { Header } from './app/UI/components/Header';
import { ToastContainer } from './app/UI/components/Toasts';
import { FormTileContext } from './app/context/form-tile-context';
import { GeneralProvider } from './app/reducer/general-provider';


function App () {
    const [ isClosed, setIsFormClosed ] = useState( true );

    const updateVisibility = () => setIsFormClosed( !isClosed );

    return (
        <GeneralProvider>
            <FormTileContext.Provider value={ { isClosed, updateVisibility } }>
                <div className="App">
                    <Header />
                    <GameInfo />

                    <Hand />
                    <Board />

                    <ToastContainer />
                </div>
            </FormTileContext.Provider>
        </GeneralProvider>
    );
}


export default App;
