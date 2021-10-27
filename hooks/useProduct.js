import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";

const useProduct = (order) => {

    const { firebase } = useContext(FirebaseContext);

    const [product, setProduct] = useState([]);

    useEffect(() => {
        
        const getProduct = () => {
        firebase.db.collection('productos').orderBy(order, 'desc').onSnapshot(handleSnapshot);
        }

        getProduct();
    }, []);

    const handleSnapshot = snapshot => {
        const products = snapshot.docs.map( doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        });
        
        setProduct(products);
    }

    return { product };
}
 
export default useProduct;