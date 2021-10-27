import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;

const Search = () => {

    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        
        if( search.trim() === '' ) return;

        Router.push({
            pathname: '/search-product',
            query: { q: search }
        })
    }

    return ( 
        <form 
            css={css`
                position: relative;
            `}
            onSubmit={handleSubmit}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos"
                onChange={e => setSearch(e.target.value)}
            />

            <InputSubmit>Buscar</InputSubmit>
        </form>
     );
}
 
export default Search;