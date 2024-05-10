import  { useEffect, useState } from 'react'
import { getProducts } from '../api/useCases';
import CardShoes from './CardShoes';
import { useEntitiesContext } from '../context/useEntitiesContext';
import { useNavigate } from 'react-router-dom';
import catchProducts from "../components/catchProducts";


const ProductsSearch = () => {

    const [products, setProducts] = useState([]);

    const {setsearchProducts}= useEntitiesContext();

    const navigate = useNavigate();



    useEffect(() => {
        const fetchApi = async () => {

            try {

            const products2=await catchProducts();
            console.log(products2)

            setProducts(products2);
            }catch(err) {
                console.log("Error:", err);

            }
        };
        fetchApi();


    }, [])

    function handlePageSearch(){
      navigate("/search")
    }

  
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    function handleSearch(e) {
      e.preventDefault();
      const searchTerm = e.target.value.toLowerCase();
      setSearchQuery(searchTerm);
  
      if (searchTerm.trim() === "") {
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
      <div className="flex  items-center justify-center my-4">
        <form
          className="w-960 flex items-center"
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
            onClick={handlePageSearch}
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
          {/* {loading && <Spinner />} */}
          {/* {error && <h1>Esto es un error</h1>} */}
          {(searchQuery ? setsearchProducts(filteredProducts) : "")}
      </div>
    );
}

export default ProductsSearch
