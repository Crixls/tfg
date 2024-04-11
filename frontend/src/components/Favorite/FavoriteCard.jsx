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
    <div className='flex justify-center items-center flex-col m-6 bg-gray-200 p-2 pl-16 pr-16 rounded-md'>
        <img src={`${apiUrl}${infoFav.contentUrl}`} alt="productos" className="w-40"/>
        <div className=' flex flex-col pt-6 pl-0'>
          <p className='font-bold '> {infoFav.name}</p>
          <p className='pt-4 pb-4'>{infoFav.description}</p>
          <p className="font-bold">{infoFav.price} €</p>
        </div>
        <button className='m-6 mt-8 text-white bg-red-600 p-4 pt-2 pb-2 rounded-md font-medium' onClick={()=>handleClick(favorito)}>Eliminar favorito</button>
    </div>
  )
}

export default FavoriteCard
