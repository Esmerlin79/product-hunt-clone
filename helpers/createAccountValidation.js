
export const createAccountValidation = (value) => {

    let errors = {};

    if( !value.nombre ) {
        errors.nombre = "El Nombre es obligatorio";
    }

    if( !value.email ) {
        errors.email = "El Email es obligatorio";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email) ) {
        errors.email = "Email no valido";
    }

    if( !value.password ) {
        errors.password = "El Password es obligatorio";
    } else if( value.password.length < 6 ){
        errors.password = "El Password debe ser de almenos 6 caracteres";
    }
    return errors;

}