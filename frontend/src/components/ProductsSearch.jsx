import  { useEffect, useState } from 'react'
import { getProducts } from '../api/useCases';
import CardShoes from './CardShoes';

const ProductsSearch = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {

            try {

            const products2=await getProducts();

            setProducts(products2);
            }catch(err) {
                console.log("Error:", err);

            }
        };
        fetchApi();


    }, [])

    console.log(products);
  
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    function handleSearch(e) {
      e.preventDefault();
      const searchTerm = e.target.value.toLowerCase();
      setSearchQuery(searchTerm);
  
      if (searchTerm.trim() === "") {
        // entonces guardo en el filtrado de películas el estado inicial. [];
        setFilteredProducts([]); //
      } else {
        const filteredResults = products?.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filteredResults || []);
      }
    }
  
    function handleClearSearch() {
      setSearchQuery("");
      setFilteredProducts([]);
    }
    return (
      <div className="flex flex-col items-center justify-center my-4">
        <form
          className="w-960 border border-gray-300  p-4 rounded-lg flex items-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar producto"
            className="w-full py-2 px-4 bg-gray-200 text-black rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Buscar
          </button>
  
          {searchQuery && (
            <button
              className="ml-2 bg-red-800 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none"
              onClick={handleClearSearch}
            >
              Borrar
            </button>
          )}
        </form>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 w-5/6">
          {/* {loading && <Spinner />} */}
          {/* {error && <h1>Esto es un error</h1>} */}
          {(searchQuery ? filteredProducts : []).map((product) => (
            <CardShoes key={product.id} typeShoe={product} />
          ))}
        </div>
      </div>
    );
}

export default ProductsSearch
