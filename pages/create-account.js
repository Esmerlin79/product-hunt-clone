import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Error, Field, Form, InputSubmit } from '../components/ui/Form';
import { createAccountValidation } from '../helpers/createAccountValidation';
import useValidation from '../hooks/useValidation';
import firebase from '../firebase/firebase';
import { useState } from 'react';
import Router from 'next/router';


export default function CreateAccount() {
  
  const [errorUser, setErrorUser] = useState('');

  const initialState = {
    nombre: '',
    email: '',
    password: ''
  }

   const createAccount = async () => {
    try {
    
     await firebase.register( nombre, email, password );
     Router.push('/');
    
    } catch (error) {
      console.log(error);
      setErrorUser(error.message);
    }

  }

  
  const { value, error, handleSubmit, handleChange, handleBlur } = useValidation(initialState, createAccountValidation, createAccount);

  const { nombre, email, password } = value;

  return (
    <div >
      <Layout >
        <h1 
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >Crear Cuenta</h1>
        
        <Form onSubmit={ handleSubmit }>
          <Field>
            <label htmlFor="nombre">Nombre</label>
            <input 
                type="text" 
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={ nombre }
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Field>

          { error.nombre  && <Error> {error.nombre}</Error>}

          <Field>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email"
                placeholder="Tu Email"
                name="email"
                value={ email }
                onChange={handleChange}
                onBlur={handleBlur}

            />
          </Field>

          { error.email  && <Error> {error.email}</Error>}


          <Field>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password"
                placeholder="Tu Password"
                name="password"
                value={ password }
                onChange={handleChange}
                onBlur={handleBlur}

            />
          </Field>

          { error.password  && <Error> {error.password}</Error>}

            { errorUser && <Error> {errorUser}</Error> }
          
          <InputSubmit 
              type="submit" 
              value="Crear Cuenta"
          />
        </Form>
      </Layout>
    </div>
  )
}
