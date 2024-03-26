import { useEffect, useState } from "react";
import {  deleteFavorite2, getFavorite, getFavorites } from "../../api/useCases";
import FavoriteCard from "../../components/Favorite/FavoriteCard";

// import { useEntitiesContext } from "../../context/useEntitiesContext";

const FavoritePage = () => {

  const [favorites, setFavorites] = useState([]);

  //  const{favorites}= useEntitiesContext;

   console.log(favorites);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
        console.log("Favoritos:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);



  return (
    <>
      <div className="p-4 bg-blue-700"> 
        <p className="text-white flex w-full text-lg">Tus productos favoritos</p>
      </div>
      <div className="grid grid-cols-3 gap-4 p-8">
        {favorites.map((favorite, index) => (
          <div key={index} className="flex justify-center w-80 bg-green-100">
            <FavoriteCard favorito={favorite}></FavoriteCard>

          </div>
        ))}  
      </div>
    </>
  )
}




export default FavoritePage
