import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProduct from '../hooks/useProduct';

export default function Home() {

  const { product } = useProduct('creado');

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
