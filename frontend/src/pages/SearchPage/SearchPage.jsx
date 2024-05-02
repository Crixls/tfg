import { useEntitiesContext } from '../../context/useEntitiesContext';
import CardShoes from '../../components/CardShoes';
import { useEffect } from 'react';

const SearchPage = () => {
    const {searchProducts,handleUnload}= useEntitiesContext();

    useEffect(() => {
        handleUnload();
    }, []);

  return (
    <>
        <div className="p-4 mt-10 flex" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
            <p className="text-white flex w-full text-2xl font-bold">RESULTADOS DE LA BÚSQUEDA</p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid sm:grid sm:grid-col-1 ">
            {Array.isArray(searchProducts) ? (
                searchProducts.map((product) => (
                    <div key={product.id} className="flex justify-center sm:ml-40 sm:mr-40 sm:mt-28 sm:mb-28 sm:gap-2">
                        <CardShoes typeShoe={product} />
                    </div>
                ))
            ) : (
                <div  className="flex justify-center sm:ml-40 sm:mr-40 sm:mt-28 sm:mb-28 sm:gap-2" >
                <CardShoes typeShoe={searchProducts} />
                </div>
            )}
        </div>
    </>        
  )
}

export default SearchPage
