import { css } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Field, Form, InputSubmit } from '../components/ui/Form';


export default function CreateAccount() {
  return (
    <div >
      <Layout >
        <h1 
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >Crear Cuenta</h1>
        
        <Form>
          <Field>
            <label htmlFor="nombre">Nombre</label>
            <input 
                type="text" 
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
            />
          </Field>

          <Field>
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email"
                placeholder="Tu Email"
                name="email"
            />
          </Field>

          <Field>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password"
                placeholder="Tu Password"
                name="password"
            />
          </Field>
          
          <InputSubmit 
              type="submit" 
              value="Crear Cuenta"
          />
        </Form>
      </Layout>
    </div>
  )
}
