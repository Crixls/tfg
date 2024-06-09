//Componente Favorito

import  { useEffect, useState } from 'react'
import { deleteFavorite2, getFavorite, getProduct } from '../../api/useCases';
import { LazyLoadImage} from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';


const FavoriteCard = ({favorito}) => {


    const [fav, setfav] = useState([]);
    const [infoFav, setinfoFav] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


    useEffect(() => {
        const fetchApi = async () => {
          try {
            const data = await getProduct(favorito.product);
            setinfoFav(data);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
    }, []);
    
  return (
    <div className='flex justify-center items-center flex-col m-6 bg-gray-200 p-2 pl-16 pr-16 rounded-md'>
        <LazyLoadImage effect="blur"  src={`${apiUrl}${infoFav.contentUrl}`} alt="productos" className="w-40"/>
        <div className=' flex flex-col pt-6 pl-0'>
          <p className='font-bold '> {infoFav.name}</p>
          <p className='pt-4 pb-4'>{infoFav.description}</p>
          <div className='flex justify-center'>
            <p className="font-bold">{infoFav.price} €</p>
          </div>
        </div>
    </div>
  )
}

export default FavoriteCard
