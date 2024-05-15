import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import mujerimg from '../../assets/mujer/mujer.webp';
import Loaderanimated from "../../components/Loaderanimated";
import catchProducts from "../../components/catchProducts";



const WomanPage = () => {
  const [womanShoes, setWomanShoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const {handleUnload}= useEntitiesContext();
  

  useEffect(() => {
    handleUnload();
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storedProducts = localStorage.getItem('allProducts');
        if (storedProducts) {
          setWomanShoes(JSON.parse(storedProducts).filter(product => product.category === "M"));
        } else {
          const fetchedProducts = await catchProducts();
          setWomanShoes(fetchedProducts.filter(product => product.category === "M"));
        }
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div className="mt-12 flex justify-center bg-black lg:pr-60 lg:pl-60 ">
      <img src={mujerimg} className="md:max-w-2xl lg:max-w-5xl sm:max-w-2xl " alt="mujer" />
    </div>
    {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(
      <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-10 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
      {womanShoes.map((womanShoe, index) => (
        <div key={index} className="flex justify-center sm:m-10 sm:gap-2 lg:m-20 " >
          <CardShoes typeShoe={womanShoe} />
        </div>
      ))}
    </div>
      )}
    </>
  )
}

export default WomanPage
