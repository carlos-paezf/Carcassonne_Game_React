import { useState, ChangeEvent } from "react";


/**
 * It takes an initial state object and returns an object with the state, a handleChange function, and
 * all the properties of the state object
 * @param {T} initialState - T - The initial state of the form.
 * @returns The state, handleChange, and the state object.
 */
export const useForm = <T extends Object> ( initialState: T ) => {
    const [ state, setState ] = useState( initialState );

    const handleChange = ( { target }: ChangeEvent<any>, optionalValue?: string ) => {
        const { name, value } = target;
        setState( {
            ...state,
            [ name ]: optionalValue ?? value
        } );
    };

    return {
        handleChange,
        ...state
    };
};