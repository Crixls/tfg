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
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid sm:grid sm:grid-col-1 ">
            {products.map((product, index) => (
              <div key={index} className="flex justify-center sm:ml-40 sm:mr-40 sm:mt-28 sm:mb-28 sm:gap-2" >
                <CardShoes typeShoe={product}></CardShoes>
              </div>
            ))}
        </div>
      )}
      </>

    )
}

export default SportsComponent
