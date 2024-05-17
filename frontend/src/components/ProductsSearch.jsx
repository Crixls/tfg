import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catchProducts from "../components/catchProducts";
import { useEntitiesContext } from '../context/useEntitiesContext';

const ProductsSearch = () => {
  const [products, setProducts] = useState([]);
  const { setsearchProducts } = useEntitiesContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const products2 = await catchProducts();
        setProducts(products2);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchApi();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredResults);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    setsearchProducts(filteredProducts);
  }, [filteredProducts, setsearchProducts]);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleClearSearch() {
    setSearchQuery("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/search");
  }

  return (
    <div className="flex items-center justify-center my-4">
      <form className="w-960 flex items-center" onSubmit={handleSubmit}>
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
            type="button"
            className="ml-2 bg-red-800 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none"
            onClick={handleClearSearch}
          >
            Borrar
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductsSearch;
