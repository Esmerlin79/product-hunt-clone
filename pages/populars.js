import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProduct from '../hooks/useProduct';

export default function Populars() {

  const { product } = useProduct('votos');

  return (
    <div >
      <Layout >
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">

              { product.map( item => (
                <ProductDetails 
                    key={item.id}
                    product={item}
                />
              ))} 

            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
