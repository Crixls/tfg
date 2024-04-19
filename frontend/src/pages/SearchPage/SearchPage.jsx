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
        <div className="grid grid-cols-3 gap-4">
            {Array.isArray(searchProducts) ? (
                searchProducts.map((product) => (
                    <div key={product.id} className="flex justify-center items-center">
                        <CardShoes typeShoe={product} />
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center">
                    <CardShoes typeShoe={searchProducts} />
                </div>
            )}
        </div>
    </>
  )
}

export default SearchPage
