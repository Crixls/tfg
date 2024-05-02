import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import niñaimg from '../../assets/niña/niños.webp';
import Loaderanimated from "../../components/Loaderanimated";


const KidsPage = () => {

  const [womanShoes, setWomanShoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const {handleUnload}= useEntitiesContext();


  useEffect(() => {
    handleUnload();

    const fetchApi = async () => {
      try {
        setLoading(true);

        const data = await getProducts();
        setWomanShoes(data.filter(product => product.category === "N"));
        console.log("Productos mujer:", data);
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);

    };
    fetchApi();
  }, []);

  return (
    <>
      
      <div className="mt-12 flex justify-center bg-black pr-60 pl-60">
        <img src={niñaimg} className="md:max-w-2xl lg:max-w-5xl sm:max-w-2xl" alt="hombres" />
      </div>
      {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid md:mt-10">
        {womanShoes.map((womanShoe, index) => (
          <div key={index} className="flex justify-center sm:m-40 sm:gap-2">
            <CardShoes typeShoe={womanShoe} />
          </div>
        ))}
      </div>
      )}
    </>
  )
}

export default KidsPage


