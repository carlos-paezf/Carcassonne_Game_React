import { FC, useEffect, useRef, useState } from 'react';
import { ToastType } from '../../constants';
import { useToast } from '../../reducer/toast-reducer';
import { IToastProps } from '../../types';


/**
 * The Toast component is a functional component that takes in a message and a type and returns a span
 * element with the message and type as class names.
 * @param  - FC<IToastProps> - this is the type of the component. FC is a generic type that takes a
 * type parameter. The type parameter is the type of the props that the component takes.
 * @returns A React component that displays a toast message.
 */
const Toast: FC<IToastProps> = ( { message, type = ToastType.ERROR, visibilityTime = 5000 } ) => {
    const [ show, setShow ] = useState( true );
    const toastRef = useRef<HTMLSpanElement>( null );

    useEffect( () => {
        const timeout = setTimeout( () => setShow( false ), visibilityTime );

        return () => clearInterval( timeout );
    }, [] );

    return (
        <>
            { show && <span className={ `toast ${ type }` } ref={ toastRef }> { message } </span > }
        </>
    );
};


/**
 * It's a React functional component that renders a div with an id of "toasts-container" and then
 * renders a Toast component for each toast in the toasts array.
 * @returns A function that returns a div with a list of toasts.
 */
export const ToastContainer: FC = () => {
    const toasts = useToast();

    return (
        <div id="toasts-container">
            {
                toasts.map( ( toast, index ) =>
                    <Toast key={ index } message={ toast.message } type={ toast.type } visibilityTime={ toast.visibilityTime } />
                )
            }
        </div>
    );
};