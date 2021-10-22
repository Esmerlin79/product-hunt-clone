import styled from '@emotion/styled';
import Link from 'next/link';

const Navigation = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;


const Nav = () => {
    return ( 
        <Navigation>
            <Link href="/">Inicio</Link>
            <Link href="/populars">Populares</Link>
            <Link href="/new-product">Nuevo Producto</Link>
        </Navigation>
     );
}
 
export default Nav;