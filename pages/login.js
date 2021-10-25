import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Error, Field, Form, InputSubmit } from '../components/ui/Form';
import { loginValidation } from '../helpers/loginValidation';
import useValidation from '../hooks/useValidation';
import firebase from '../firebase/firebase';
import { useState } from 'react';
import Router from 'next/router';

const initialState = {
  email: '',
  password: ''
}


export default function Login() {

  const [errorUser, setErrorUser] = useState('');

   const Login = async () => {
    
    try {
      
      const user = await firebase.login( email, password );
      console.log(user)
      Router.push('/');

    } catch (error) {
      console.log(error);
      setErrorUser(error.message)
    }

  }

  
  const { value, error, handleSubmit, handleChange, handleBlur } = useValidation(initialState, loginValidation, Login);

  const { email, password } = value;

  return (
    <div >
      <Layout >
        <h1 
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >Iniciar Sesion</h1>
        
        <Form onSubmit={ handleSubmit }>

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
              value="Iniciar Sesion"
          />
        </Form>
      </Layout>
    </div>
  )
}
