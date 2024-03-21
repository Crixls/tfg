import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";

const WomanPage = () => {
  const [womanShoes, setWomanShoes] = useState([]);

  useEffect(() => {
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
    <div className="grid grid-cols-3 gap-4 ">
        {womanShoes.map((womanShoe, index) => (
          <div key={index} className="flex justify-center">
            <CardShoes typeShoe={womanShoe} />
          </div>
        ))}
      </div>
  )
}

export default WomanPage
