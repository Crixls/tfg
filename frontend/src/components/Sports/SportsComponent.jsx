import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../CardShoes";

const SportsComponent = ({type}) => {

    console.log(type);

    const [products, setproducts] = useState([]);


    useEffect(() => {
        const fetchApi = async () => {
          try {
            const data = await getProducts();
            const filteredProducts = data.filter(product => {
              return product.deporte.includes(type);
            });
            console.log(filteredProducts);
            setproducts(filteredProducts);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
      }, [type]);
      

    return (
        <div className="grid grid-cols-3 justify-items-center items-center p-4">
            {products.map((product, index) => (
                <CardShoes key={index} typeShoe={product}></CardShoes>
            ))}
        </div>

    )
}

export default SportsComponent
