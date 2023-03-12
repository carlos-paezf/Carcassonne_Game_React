import { Dispatch, SetStateAction, createContext } from "react";
import { ITile } from "../types";


type FormTileType = {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    selectedTile?: ITile,
    setSelectedTile: Dispatch<SetStateAction<ITile | undefined>>;
};


export const FormTileContext = createContext<FormTileType>( {
    isVisible: false,
    setIsVisible: () => { },
    selectedTile: undefined,
    setSelectedTile: () => { }
} );
