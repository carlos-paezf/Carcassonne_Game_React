import './App.css';
import { Header } from './UI/components/header/index';
import { GameInfoContext, ToastContext } from './app/context';
import { useState } from 'react';
import { GameInfoType, ToastPropsType } from './app/types';
import { GameInfo } from './UI/components/game-info/index';
import { ToastContainer } from './UI/components/toast/index';
import { initialGameInfo } from './app/constants';


function App () {
    const [ gameInfo, setGameInfo ] = useState<GameInfoType>( initialGameInfo );

    const [ toasts, setToasts ] = useState<ToastPropsType[]>( [] );

    const addToast = ( { message, type }: ToastPropsType ) => {
        setToasts( [ ...toasts, { message, type } ] );
    };

    return (
        <GameInfoContext.Provider value={ { gameInfo, setGameInfo } }>
            <div className="App">
                <Header />

                <GameInfo />

                <ToastContext.Provider value={ { toasts, addToast } }>
                    <ToastContainer />
                </ToastContext.Provider>
            </div>
        </GameInfoContext.Provider>
    );
}


export default App;
