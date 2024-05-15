import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../CardShoes";
import Loaderanimated from "../../components/Loaderanimated";
import catchProducts from "../../components/catchProducts";


const SportsComponent = ({type}) => {

    const [loading, setLoading] = useState(false);

    const [products, setproducts] = useState([]);


    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const storedProducts = localStorage.getItem('allProducts');
          if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            const filteredProducts = parsedProducts.filter(product =>  product.deporte.includes(type));
            setproducts(filteredProducts);
          } else {
            const fetchedProducts = await catchProducts();
            const filteredProducts = fetchedProducts.filter(product =>  product.deporte.includes(type));
            setproducts(filteredProducts);
          }
        } catch (error) {
          console.log("Error:", error);
        }
        setLoading(false);
      };
    
      fetchProducts();
    }, [type]);
    
      

    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid sm:grid sm:grid-col-1 ">
            {products.map((product, index) => (
              <div key={index} className="flex justify-center  sm:gap-2" >
                <CardShoes typeShoe={product}></CardShoes>
              </div>
            ))}
        </div>
      )}
      </>

    )
}

export default SportsComponent
