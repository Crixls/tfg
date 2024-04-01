import { useEffect, useState } from "react";
import { getFavorites } from "../../api/useCases";
import FavoriteCard from "../../components/Favorite/FavoriteCard";
import { useAuthContext } from "../../context/useAuthContext";


const FavoritePage = () => {

  const [favorites, setFavorites] = useState([]);

  const{userLogged}= useAuthContext();

  console.log(userLogged);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getFavorites();
        const filteredFavorites = data.filter(favorite => {
          const userId = parseInt(favorite.user.split('/').pop(), 10); // Obtener el ID del usuario desde la ruta de la API
          console.log(userLogged);
          return userId === parseInt(userLogged, 10);
        });
        setFavorites(filteredFavorites);
        console.log("Favoritos:", filteredFavorites);
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
