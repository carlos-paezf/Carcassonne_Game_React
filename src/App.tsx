import './App.css';

import { Board } from './app/UI/components/Board';
import { GameInfo } from './app/UI/components/GameInfo';
import { Hand } from './app/UI/components/Hand';
import { Header } from './app/UI/components/Header';
import { ToastContainer } from './app/UI/components/Toasts';
import { GeneralProvider } from './app/reducer/general-provider';


function App () {
    return (
        <GeneralProvider>
            <div className="App">
                <Header />
                <GameInfo />

                <Hand />
                <Board />

                <ToastContainer />
            </div>
        </GeneralProvider>
    );
}


export default App;
