import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
    return ( 
        <form 
            css={css`
                position: relative;
            `}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos"
            />

            <InputSubmit>Buscar</InputSubmit>
        </form>
     );
}
 
export default Search;