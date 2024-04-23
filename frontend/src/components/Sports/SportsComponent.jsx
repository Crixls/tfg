import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../CardShoes";
import Loaderanimated from "../../components/Loaderanimated";


const SportsComponent = ({type}) => {

    const [loading, setLoading] = useState(false);

    const [products, setproducts] = useState([]);


    useEffect(() => {
        const fetchApi = async () => {
          try {
            setLoading(true);

            const data = await getProducts();
            const filteredProducts = data.filter(product => {
              return product.deporte.includes(type);
            });
            console.log(filteredProducts);
            setproducts(filteredProducts);
          } catch (error) {
            console.log("Error:", error);
          }
          setLoading(false);

        };
        fetchApi();
      }, [type]);
      

    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(
        <div className="grid grid-cols-3 justify-items-center items-center p-4">
            {products.map((product, index) => (
                <CardShoes key={index} typeShoe={product}></CardShoes>
            ))}
        </div>
      )}
      </>

    )
}

export default SportsComponent
