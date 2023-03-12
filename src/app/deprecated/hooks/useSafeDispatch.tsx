import { useReducer } from "react";
import { useToastDispatch } from "../../reducer/toast-reducer";
import { ToastType } from "../../constants";

/**
 * It's a custom hook that wraps the useReducer hook and adds error handling.
 * @param {any} reducer - any - The reducer function that you would normally pass to useReducer.
 * @param {any} initialState - any
 * @returns An array with two elements. The first element is the state and the second element is the
 * dispatch function.
 */
export const useSafeDispatch = ( reducer: any, initialState: any ) => {
    const [ state, unsafeDispatch ] = useReducer( reducer, initialState );
    const dispatchToast = useToastDispatch();

    const dispatch = ( action: any ) => {
        try {
            action( unsafeDispatch );
        } catch ( error ) {
            return dispatchToast( {
                type: 'addToast',
                payload: {
                    message: error, type: ToastType.ERROR
                }
            } );
        }
    };

    return [ state, dispatch ];
};