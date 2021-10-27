import Layout from "../../components/layout/Layout";
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";



const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;


const Product = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [consultDB, setConsultDB] = useState(true);

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase, user } = useContext(FirebaseContext);
    
    useEffect(() => {
        
        if( id && consultDB ) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('productos').doc(id);
                const resp = await productQuery.get();

                if( resp.exists ) {
                    setProduct(resp.data());
                    setConsultDB(false);
                } else {
                    setError(true);
                    setConsultDB(false);
                }
            }

            getProduct();
        }
    }, [id])

    if(Object.keys(product).length === 0 && !error) return <p>Cargando...</p>
    
    const { comentarios, creado, descripcion, empresa, nombre, url, urlImage, votos, creador, haVotado } = product;

    const productVote = () => {
        if( !user ) {
            return router.push('/login');
        }
        const newTotal = votos + 1;

        if( haVotado.includes(user.uid) ) return;

        const votesUid = [...haVotado, user.uid];

        firebase.db.collection('productos').doc(id).update({ votos: newTotal, haVotado: votesUid });
        
        setProduct({
            ...product,
            votos: newTotal
        })

        setConsultDB(true);
    }

    const commentChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
    }

    const addComment = (e) => {
        e.preventDefault();
        if( !user ) {
            return router.push('/login');
        }

        comment.userId = user.uid;
        comment.userName = user.displayName;

        const newComments = [...comentarios, comment];
        
        firebase.db.collection('productos').doc(id).update({ comentarios: newComments });

        setProduct({
            ...product,
            comentarios: newComments
        })
        setConsultDB(true);

    }

    const isCreator = id => {
        if( creador.id === id ) {
            return true;
        }
    }

    const isDeleteProduct = () => {
        if( !user ) return false;

        if( creador.id === user.uid ) {
            return true;
        }

    }

    const deleteProduct = async () => {
        
        if( !user ) {
            return router.push('/login');
        }

        if( creador.id !== user.uid ) {
            return router.push('/login');
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');

        } catch (error) {
            console.log(error);
        }
    }


    return ( 
        <Layout >
            { error ? <Error404 /> : (
                <>
                    <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{nombre}</h1>

                        <ProductContainer>
                            <div>
                                <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                                <p>Por: {creador.nombre} de {empresa}</p>

                                <img src={urlImage} />
                                <p>{descripcion}</p>

                                { user && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form onSubmit={addComment}>
                                            <Field>
                                                <input 
                                                    type="text"
                                                    onChange={commentChange}
                                                    name="mensaje"
                                                />
                                            </Field>

                                            <InputSubmit 
                                                type="submit"
                                                value="Agregar Comentario"
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>

                                {comentarios.length === 0 ? "Aun no hay comentarios" :(
                                    <ul>
                                    {
                                        comentarios.map( (comentario, i) => (
                                            <li 
                                                key={`${comentario.userId }-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por:
                                                    
                                                    <span css={css`
                                                        font-weight: bold;
                                                    `}>
                                                        {''} {comentario.userName}
                                                    </span>
                                                </p>
                                                { isCreator( comentario.userId ) && <ProductCreator>Es Creador</ProductCreator>  }
                                            </li>
                                        ))
                                    }
                                </ul>    
                                )}
                            </div>

                            <aside>
                                <Button 
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >
                                    Visitar URL
                                </Button>

                            <div css={css`
                                    margin-top: 5rem;
                            `}> 
                                <p css={css`
                                        text-align: center;
                                    `}>{votos} Votos</p>

                                    { user && ( 
                                        <Button
                                            onClick={productVote}
                                        >
                                            Votar
                                        </Button> 
                                    ) }
                            </div>
                            </aside>
                        </ProductContainer>

                        { isDeleteProduct() && 
                            <Button 
                                onClick={deleteProduct}
                            > Eliminar Producto </Button>
                        }
                    </div>
                </>
            ) }

        </Layout>
     );
}
 
export default Product;

// { error ? <Error404 /> : (

//     <h1>dsds</h1>
// )}