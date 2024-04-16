import  { useEffect } from 'react'
import SportsComponent from '../../components/Sports/SportsComponent'
import { useEntitiesContext } from '../../context/useEntitiesContext';
import ProductsSearch from '../../components/ProductsSearch';


const RunningPage = () => {

  const {search,handleUnload}= useEntitiesContext();

  useEffect(() => {
    handleUnload();
  }, []);


  return (
    <>
      {search ? <ProductsSearch></ProductsSearch>:""}
       <div className="p-4 mt-10 flex" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">StreetPulse Running</p>
        </div>
        <div className='flex justify-center items-center'>
          <SportsComponent type="running"></SportsComponent>
        </div>
    </>
  )
}

export default RunningPage
