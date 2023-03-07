import { FC, useContext, useEffect, useState, useRef } from 'react';
import { ToastContext } from '../../../app/context/index';
import { IToastProps, ToastType } from '../../../app/types';


const Toast: FC<IToastProps> = ( { message, type = ToastType.ERROR } ) => {
    const [ show, setShow ] = useState( true );
    const toastRef = useRef<HTMLSpanElement>( null );

    useEffect( () => {
        const timeout = setTimeout( () => setShow( false ), 5000 );

        return () => {
            clearInterval( timeout );
            toastRef.current?.remove();
        };
    }, [] );

    return (
        <>
            { show && <span className={ `toast ${ type }` } ref={ toastRef }> { message } </span > }
        </>
    );
};


export const ToastContainer: FC = () => {
    const { toasts } = useContext( ToastContext );

    return (
        <div id="toasts-container">
            {
                toasts.map( ( toast, index ) =>
                    <Toast key={ index } message={ toast.message } type={ toast.type } />
                )
            }
        </div>
    );
};