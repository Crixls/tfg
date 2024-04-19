import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import mujerimg from '../../assets/mujer/mujer.webp';



const WomanPage = () => {
  const [womanShoes, setWomanShoes] = useState([]);

  const {handleUnload}= useEntitiesContext();


  useEffect(() => {
    handleUnload();
    const fetchApi = async () => {
      try {
        const data = await getProducts();
        setWomanShoes(data.filter(product => product.category === "M"));
        console.log("Productos mujer:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
    <div className="mt-12 flex justify-center bg-black pr-60 pl-60">
      <img src={mujerimg} alt="mujer" />
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

export default WomanPage
