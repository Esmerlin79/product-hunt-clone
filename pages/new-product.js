import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Error, Field, Form, InputSubmit } from '../components/ui/Form';
import { createProductValidation } from '../helpers/createProductValidation';
import useValidation from '../hooks/useValidation';
import { Fragment, useContext, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FirebaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
import Error404 from '../components/layout/404';

export default function NewProduct() {
  
  const { firebase, user } = useContext(FirebaseContext);

  const router = useRouter();

  const [nameImage, setNameImage] = useState('');
  const [upload, setUpload] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('');
  
  const [errorUser, setErrorUser] = useState('');

  const initialState = {
    nombre: '',
    empresa: '',
    // imagen: '',
    url: '',
    descripcion: ''
  }

   const createProduct = async () => {
    
    if( !user ) {
      return router.push('/login');
    }

    const product = {
      nombre,
      empresa,
      url,
      urlImage,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: user.uid,
        nombre: user.displayName
      },
      haVotado: []
    }

    firebase.db.collection('productos').add(product);

    return Router.push('/');
  }
  const handleUploadStart = () => {
    setSaveProgress(0);
    setUpload(true)
  }

  const handleProgress = progress => setSaveProgress(progress);

  const handleUploadError = error => {
    setUpload(error);
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    setSaveProgress(100);
    setUpload(false);
    setNameImage(filename);
    firebase.storage.ref('productos').child(filename).getDownloadURL().then( url =>{ 
      console.log(url);
      setUrlImage(url);
    });
  };
 

  const { value, error, handleSubmit, handleChange, handleBlur } = useValidation(initialState, createProductValidation, createProduct);

  const { nombre, empresa, imagen, url, descripcion } = value;


  return (
    <div >
      <Layout >

        { !user ? <Error404 /> : (
          <Fragment>
             <h1 
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >Nuevo Producto</h1>
            
            <Form onSubmit={ handleSubmit }>
              <fieldset>
                <legend>Informacion General</legend>
              <Field>
                <label htmlFor="nombre">Nombre</label>
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={ nombre }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>

              { error.nombre  && <Error> {error.nombre}</Error>}

              <Field>
                <label htmlFor="empresa">Empresa</label>
                <input 
                    type="text" 
                    id="empresa"
                    placeholder="Nombre Empresa o Compania"
                    name="empresa"
                    value={ empresa }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>

              { error.empresa  && <Error> {error.empresa}</Error>}

              <Field>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader 
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}

                />
              </Field>

              <Field>
                <label htmlFor="url">URL</label>
                <input 
                    type="url" 
                    id="url"
                    placeholder="URL de tu Producto"
                    name="url"
                    value={ url }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>

              { error.url  && <Error> {error.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>Sobre tu Producto</legend>

                <Field>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea 
                    id="descripcion"
                    placeholder="Descripcion del Producto"
                    name="descripcion"
                    value={ descripcion }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              </Field>

              { error.descripcion  && <Error> {error.descripcion}</Error>}

              </fieldset>



                { errorUser && <Error> {errorUser}</Error> }
              
              <InputSubmit 
                  type="submit" 
                  value="Crear Producto"
              />
            </Form>
          </Fragment>
        )}
       
      </Layout>
    </div>
  )
}
