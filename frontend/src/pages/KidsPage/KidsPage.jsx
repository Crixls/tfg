import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import ProductsSearch from "../../components/ProductsSearch";
import niñaimg from '../../assets/niña/niños.webp';


const KidsPage = () => {

  const [womanShoes, setWomanShoes] = useState([]);

  const {search,handleUnload}= useEntitiesContext();


  useEffect(() => {
    handleUnload();

    const fetchApi = async () => {
      try {
        const data = await getProducts();
        setWomanShoes(data.filter(product => product.category === "N"));
        console.log("Productos mujer:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {search ? <ProductsSearch></ProductsSearch>:""}
      <div className="mt-20 flex justify-center bg-black p-10">
        <img className="w-2/3 pl-10" src={niñaimg} alt="hombres" />
      </div>
      <div className="grid grid-cols-3 gap-4 m-20">
        {womanShoes.map((womanShoe, index) => (
          <div key={index} className="flex justify-center">
            <CardShoes typeShoe={womanShoe} />
          </div>
        ))}
      </div>
    </>
  )
}

export default KidsPage


