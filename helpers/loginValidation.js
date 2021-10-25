
export const loginValidation = (value) => {

    let errors = {};

    if( !value.email ) {
        errors.email = "El Email es obligatorio";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email) ) {
        errors.email = "Email no valido";
    }

    if( !value.password ) {
        errors.password = "El Password es obligatorio";
    } 
    
    return errors;

}