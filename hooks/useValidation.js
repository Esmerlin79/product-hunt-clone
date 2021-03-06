import { useEffect, useState } from "react";

const useValidation = ( initialState, validation, handleFunction ) => {
    
    const [value, setValue] = useState( initialState );
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if( submitForm ) {
            const isError = Object.keys(error).length !== 0;

            if( !isError ) {
                handleFunction();
            }
            
            setSubmitForm(false);
        }   
    }, [error]);

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validation(value);
        setError(validationErrors);
        setSubmitForm(true);
    }

    const handleBlur = () => {
        const validationErrors = validation(value);
        setError(validationErrors);
    }
    return {
        value,
        error,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;