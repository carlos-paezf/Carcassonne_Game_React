import { createContext } from "react";


type FormTileType = {
    isClosed: boolean;
    updateVisibility: () => void;
};


export const FormTileContext = createContext<FormTileType>( {
    isClosed: true,
    updateVisibility: () => { }
} );
