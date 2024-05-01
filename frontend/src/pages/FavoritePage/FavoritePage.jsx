import { useEffect, useState } from "react";
import { getFavorites } from "../../api/useCases";
import FavoriteCard from "../../components/Favorite/FavoriteCard";
import { useAuthContext } from "../../context/useAuthContext";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import Loaderanimated from "../../components/Loaderanimated";



const FavoritePage = () => {

  const [favorites, setFavorites] = useState([]);

  const {handleUnload}= useEntitiesContext();

  const{userLogged}= useAuthContext();
  const [loading, setLoading] = useState(false);


  console.log(userLogged);
  useEffect(() => {
    handleUnload();

    const fetchApi = async () => {
      try {
        setLoading(true);

        const data = await getFavorites();
        const filteredFavorites = data.filter(favorite => {
          const userId = parseInt(favorite.user.split('/').pop(), 10); // Obtener el ID del usuario desde la ruta de la API
          console.log(userLogged);
          return userId === parseInt(userLogged, 10);
        });
        setFavorites(filteredFavorites);
        console.log("Favoritos:", filteredFavorites);
        setLoading(false);

      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);



  return (
    <>
      <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
        <p className="text-white flex w-full text-2xl font-bold">Tus productos favoritos</p>
      </div>
      {loading ? (
          <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ):(
      <div className="flex justify-center">
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
          {favorites.map((favorite, index) => (
            <div key={index} className="flex justify-center  ">
              <FavoriteCard favorito={favorite}></FavoriteCard>
            </div>
          ))}  
        </div>
      </div>
      )}
    </>
  )
}




export default FavoritePage
