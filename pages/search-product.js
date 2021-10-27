import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import useProduct from '../hooks/useProduct';


export default function SearchProduct() {
  
  const router = useRouter();
  const { query:{ q }} = router;
  
  const { product } = useProduct('creado');
  const [result, setResult] = useState([]);
  
  useEffect(() => {
    const search = q.toLowerCase();
    const filter = product.filter( item => {
      return (
        item.nombre.toLowerCase().includes(search) || 
        item.descripcion.toLowerCase().includes(search)
      )
    })

    setResult(filter);

  }, [q, product])
  
  return (
    <div >
      <Layout >
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">

              { result.map( item => (
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
