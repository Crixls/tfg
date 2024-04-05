// import React from 'react'

import { useEffect, useState } from "react";
import { getProducts } from "../../api/useCases";
import CardShoes from "../../components/CardShoes";
import ProductsSearch from "../../components/ProductsSearch";
import { useEntitiesContext } from "../../context/useEntitiesContext";



const ManPage = () => {
  const [manShoes, setManShoes] = useState([]);

  const {search,handleUnload}= useEntitiesContext();


  useEffect(() => {
    handleUnload();
    const fetchApi = async () => {
      try {
        const data = await getProducts();
        setManShoes(data.filter(product => product.category === "H"));
        console.log("Productos hombre:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {search ? <ProductsSearch></ProductsSearch>:""}

      <div className="grid grid-cols-3 gap-4 m-20">
        {manShoes.map((manShoe, index) => (
          <div key={index} className="flex justify-center">
            <CardShoes typeShoe={manShoe} />
          </div>
        ))}
      </div>
      
    </>
  );
}

export default ManPage
