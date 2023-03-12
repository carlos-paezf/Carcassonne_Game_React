import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GeneralProvider } from './app/reducer/general-provider';

ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <GeneralProvider>
            <App />
        </GeneralProvider>
    </React.StrictMode>,
);
