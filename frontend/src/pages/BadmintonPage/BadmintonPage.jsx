import { useEffect } from 'react';
import SportsComponent from '../../components/Sports/SportsComponent'
import { useEntitiesContext } from '../../context/useEntitiesContext';

const BadmintonPage = () => {
  const {handleUnload}= useEntitiesContext();

  useEffect(() => {
    handleUnload();
  }, []);

  return (
    <>
        <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">StreetPulse Badminton</p>
        </div>
        <SportsComponent type="badminton"></SportsComponent>
    </>
  )
}

export default BadmintonPage
