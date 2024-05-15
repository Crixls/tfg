// import React from 'react'

import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import { useEntitiesContext } from "../../context/useEntitiesContext";

import hombreimg from '../../assets/hombre/poster-hombre.webp';
import Loaderanimated from "../../components/Loaderanimated";
import catchProducts from "../../components/catchProducts";





const ManPage = () => {
  const [manShoes, setManShoes] = useState([]);

  const {handleUnload}= useEntitiesContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleUnload();
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storedProducts = localStorage.getItem('allProducts');
        if (storedProducts) {
          setManShoes(JSON.parse(storedProducts).filter(product => product.category === "H"));
        } else {
          const fetchedProducts = await catchProducts();
          setManShoes(fetchedProducts.filter(product => product.category === "H"));
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
      <div className="mt-12 lg:flex lg:justify-center lg:bg-black lg:pr-60 lg:pl-60">
        <img src={hombreimg} className="lg:max-w-5xl  " alt="hombres" />
      </div>

      {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(

        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
        {manShoes.map((manShoe, index) => (
          <div key={index} className="flex justify-center m-10   sm:gap-2">
            <CardShoes typeShoe={manShoe} />
          </div>
        ))}
      </div>
      )}

      
    </>
  );
}

export default ManPage
