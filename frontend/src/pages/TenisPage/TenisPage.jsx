import { useEffect } from "react";
import SportsComponent from "../../components/Sports/SportsComponent"
import { useEntitiesContext } from "../../context/useEntitiesContext";

const TenisPage = () => {

  const {handleUnload}= useEntitiesContext();

  useEffect(() => {
    handleUnload();
  }, []);

  return (
    <>        
        <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">StreetPulse Tenis</p>
        </div>
        <SportsComponent type="tenis"></SportsComponent>
    </>
  )
}

export default TenisPage