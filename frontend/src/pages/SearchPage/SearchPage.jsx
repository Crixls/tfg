import { useEntitiesContext } from '../../context/useEntitiesContext';
import CardShoes from '../../components/CardShoes';
import { useEffect, useState } from 'react';
import Loaderanimated from '../../components/Loaderanimated';
import fondo from "../../assets/favorite/favoritetext.jpg";

const SearchPage = () => {
  const { searchProducts } = useEntitiesContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchProducts.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [searchProducts]);

  return (
    <>
      <div
        className="p-4 mt-10 flex"
        style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <p className="text-white flex w-full text-2xl font-bold">RESULTADOS DE LA BÚSQUEDA</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid sm:grid sm:grid-cols-1 grid">
          {Array.isArray(searchProducts) ? (
            searchProducts.map((product) => (
              <div key={product.id} className="flex justify-center sm:mt-28 sm:mb-28 sm:gap-2">
                <CardShoes typeShoe={product} />
              </div>
            ))
          ) : (
            <div className="flex justify-center sm:mt-28 sm:mb-28 sm:gap-2">
              <CardShoes typeShoe={searchProducts} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
