import  { useEffect } from 'react'
import SportsComponent from '../../components/Sports/SportsComponent'
import { useEntitiesContext } from '../../context/useEntitiesContext';


const RunningPage = () => {

  const {handleUnload}= useEntitiesContext();

  useEffect(() => {
    handleUnload();
  }, []);


  return (
    <>
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