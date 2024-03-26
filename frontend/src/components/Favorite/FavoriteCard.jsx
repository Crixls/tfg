import React, { useEffect, useState } from 'react'
import { deleteFavorite2, getFavorite, getProduct } from '../../api/useCases';

const FavoriteCard = ({favorito}) => {

    console.log(favorito);

    const [fav, setfav] = useState([]);
    const [infoFav, setinfoFav] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;





    const handleClick=(favorite)=>{
        setfav(favorite);
    }

    useEffect(() => {
        const fetchApi = async () => {
          try {
            console.log(fav)
            const data = await deleteFavorite2(fav);
            console.log("Favoritos:", data);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
    }, [fav]);

    useEffect(() => {
        const fetchApi = async () => {
          try {
            console.log(fav)
            const data = await getProduct(favorito.product);
            setinfoFav(data);
            console.log("Favorito:", data);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
    }, []);
    
  return (
    <div>
        <img src={`${apiUrl}${infoFav.contentUrl}`} alt="productos" className="w-40"/>
        <p>Name: {infoFav.name}</p>
        <p>Description: {infoFav.description}</p>
        <p className="font-bold">{infoFav.price} €</p>
        <button onClick={()=>handleClick(favorito)}>Eliminar favorito</button>
    </div>
  )
}

export default FavoriteCard
