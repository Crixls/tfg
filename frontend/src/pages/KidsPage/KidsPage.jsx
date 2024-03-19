import { useEffect, useState } from "react";
import { getProductsTodos } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";

const KidsPage = () => {

  const [womanShoes, setWomanShoes] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getProductsTodos();
        setWomanShoes(data.filter(product => product.category === "N"));
        console.log("Productos mujer:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 ">
        {womanShoes.map((womanShoe, index) => (
          <div key={index} className="flex justify-center">
            <CardShoes typeShoe={womanShoe} />
          </div>
        ))}
      </div>
  )
}

export default KidsPage


