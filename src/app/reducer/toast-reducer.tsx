import { FC, createContext, useContext, useReducer } from "react";
import { IReducerAction, IToastProps, Props } from "../types";


const ToastContext = createContext<IToastProps[]>( [] );
const ToastDispatchContext = createContext<any>( null );


/**
 * It returns the value of the ToastContext
 */
export const useToast = () => useContext( ToastContext );
/**
 * It returns the dispatch function from the ToastContext
 */
export const useToastDispatch = () => useContext( ToastDispatchContext );


export const ToastProvider: FC<Props> = ( { children } ) => {
    const [ toasts, dispatch ] = useReducer( toastReducer, [] );

    return (
        <ToastContext.Provider value={ toasts }>
            <ToastDispatchContext.Provider value={ dispatch }>
                { children }
            </ToastDispatchContext.Provider>
        </ToastContext.Provider>
    );
};


export interface IActionHandlers {
    [ key: string ]: ( object: IToastProps[], payload: IToastProps ) => IToastProps[];
}


const actionHandlers: IActionHandlers = {
    addToast: ( toasts, payload ) => ( [
        ...toasts,
        { message: payload!.message, type: payload!.type }
    ] )
};


/**
 * If the action type is not found in the actionHandlers object, throw an error. Otherwise, return the
 * result of calling the handler function with the toasts and payload arguments.
 * @param {IToastProps[]} toasts - IToastProps[]
 * @param action - IReducerAction<IToastProps>
 * @returns The return value is a function that takes two arguments.
 */
function toastReducer ( toasts: IToastProps[], action: IReducerAction<IToastProps> ) {
    const handler = actionHandlers[ action.type ];

    if ( !handler ) {
        throw new Error( `Unhandled action type ${ action.type }` );
    }

    return handler( toasts, action.payload );
}