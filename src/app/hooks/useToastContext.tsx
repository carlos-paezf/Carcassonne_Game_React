import { useState } from "react";
import { IToastProps } from "../types";


export const useToastContext = () => {
    const [ toasts, setToasts ] = useState<IToastProps[]>( [] );

    /**
     * AddToast is a function that takes an object with a message and a type property, and adds it to
     * the toasts array.
     * @param {IToastProps}  - IToastProps - This is the type of the parameter that is being passed in.
     */
    const addToast = ( { message, type }: IToastProps ) => {
        setToasts( [ ...toasts, { message, type } ] );
    };

    return {
        toasts, addToast
    };
};