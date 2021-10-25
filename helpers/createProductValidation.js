

export const createProductValidation = (value) => {

    let errors = {};

    if( !value.nombre ) {
        errors.nombre = "El Nombre es obligatorio";
    }

    if( !value.empresa ) {
        errors.empresa = "El nombre de la empresa es obligatorio";
    }

    if( !value.url ) {
        errors.url = "La URL del producto es obligatoria";
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(value.url ) ) {
        errors.url = "La URL no es valida";
    }
    
    if( !value.descripcion ) {
        errors.descripcion = "Agrega una descripcion de tu producto";
    }

    return errors;

}