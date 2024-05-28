import { useEffect } from 'react';
import SportsComponent from '../../components/Sports/SportsComponent'
import { useEntitiesContext } from '../../context/useEntitiesContext';
import ProductsSearch from '../../components/ProductsSearch';
import fondo from '../../assets/favorite/favoritetext.jpg'


const BasketPage = () => {

    const {handleUnload}= useEntitiesContext();

    useEffect(() => {
        handleUnload();
    }, []);

  return (
    <>
        <div className="p-4 mt-10" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">BALONCESTO</p>
        </div>
        <SportsComponent type="baloncesto"></SportsComponent>
    </>
  )
}

export default BasketPage
