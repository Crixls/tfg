import { useEffect } from "react";
import SportsComponent from "../../components/Sports/SportsComponent"
import { useEntitiesContext } from "../../context/useEntitiesContext";
import ProductsSearch from "../../components/ProductsSearch";

const FitnessPage = () => {
    const {search,handleUnload}= useEntitiesContext();

    useEffect(() => {
        handleUnload();
    }, []);


  return (
    <>
        {search ? <ProductsSearch></ProductsSearch>:""}
        <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">StreetPulse Fitness</p>
        </div>
        <SportsComponent type="fitness"></SportsComponent>
    </>
  )
}

export default FitnessPage
