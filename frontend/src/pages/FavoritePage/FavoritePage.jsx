import { useEffect, useState } from "react";
import { getFavorites } from "../../api/useCases";
import FavoriteCard from "../../components/Favorite/FavoriteCard";
import { useAuthContext } from "../../context/useAuthContext";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import Loaderanimated from "../../components/Loaderanimated";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleUnload } = useEntitiesContext();
  const { userLogged } = useAuthContext();

  useEffect(() => {
    handleUnload();

    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchFavorites(parseInt(userId, 10));
    }
  }, []);

  const fetchFavorites = async (userId) => {
    try {
      setLoading(true);
      const data = await getFavorites();
      const filteredFavorites = data.filter(favorite => {
        const favUserId = parseInt(favorite.user.split('/').pop(), 10);
        return favUserId === userId;
      });
      setFavorites(filteredFavorites);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
        <p className="text-white flex w-full text-2xl font-bold">Tus productos favoritos</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ) : (
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
  );
};

export default FavoritePage;
