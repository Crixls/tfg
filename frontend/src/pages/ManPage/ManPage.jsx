// import React from 'react'

import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";

import hombreimg from '../../assets/hombre/poster-hombre.webp';
import Loaderanimated from "../../components/Loaderanimated";





const ManPage = () => {
  const [manShoes, setManShoes] = useState([]);

  const {handleUnload}= useEntitiesContext();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    handleUnload();
    const fetchApi = async () => {
      try {
        setLoading(true);

        const data = await getProducts();
        setManShoes(data.filter(product => product.category === "H"));
        console.log("Productos hombre:", data);
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
        <img src={hombreimg} className="md:max-w-2xl lg:max-w-5xl" alt="hombres" />
      </div>

      {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(

        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
        {manShoes.map((manShoe, index) => (
          <div key={index} className="flex justify-center">
            <CardShoes typeShoe={manShoe} />
          </div>
        ))}
      </div>
      )}

      
    </>
  );
}

export default ManPage
