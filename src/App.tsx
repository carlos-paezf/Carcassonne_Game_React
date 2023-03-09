import './App.css';

import { Board } from './app/UI/components/board/Board';
import { GameInfo } from './app/UI/components/game-info/index';
import { Hand } from './app/UI/components/hand';
import { Header } from './app/UI/components/header/index';
import { ToastContainer } from './app/UI/components/toast/index';
import { MultipleContextProvider } from './app/context/context-provider';
import { GeneralProvider } from './app/reducer/general-provider';


function App () {
    return (
        <MultipleContextProvider>
            <GeneralProvider>
                <div className="App">
                    <Header />
                    <GameInfo />

                    <Hand />
                    <Board />

                    <ToastContainer />
                </div>
            </GeneralProvider>
        </MultipleContextProvider>
    );
}


export default App;
