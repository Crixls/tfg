import { createContext, useContext, useEffect, useState } from "react";
import { createProduct, deleteFavorite2, postFavorites } from "../api/useCases";

const EntitiesContext = createContext();

export const EntitiesProvider = (props) => {
    const { children } = props;
    const [products, setProducts] = useState([]);
    const [users] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchProducts, setsearchProducts] = useState([]);
    const [dataDetails, setDataDetails] = useState(null);
    const [search, setSearch] = useState(false);


    const addProduct = async (product) => {
        try {
            const data = await createProduct(product);
            console.log(data.image);
            if (!data) throw new Error(`Error en addUser: no se creó el usuario`);
            setProducts(prevProducts => [
                ...prevProducts,
                {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    imageFile: data.imageFile,
                    size: data.size,
                    brand: data.brand,
                    category: data.category,
                    new: data.new,
                    color: data.color,
                    deporte: data.deporte,
                    imageFiles:data.imageFiles
                },
            ]);
            return data;
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    const changeSearch = async (search) => {
        setSearch(search);
    }

    const handleUnload = () => {
        setSearch(false);
    };


    const addFavorite = async (productId, userId) => {
      console.log(productId, userId);
        try {
            await postFavorites(productId, userId);
            setFavorites(prevFavorites => [...prevFavorites, productId]);
        } catch (error) {
            console.error("Error al añadir favorito:", error);
        }
    };

    const removeFavorite = async (favoritoId) => {
      try {
        // Llama a la función en tu API para eliminar el favorito
        await deleteFavorite2(favoritoId);
        // Actualiza el estado de favoritos eliminando el producto
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favoritoId));
      } catch (error) {
          console.error("Error al eliminar favorito:", error);
      }
    };

    const updateDetails = (newData) => {
        setDataDetails(newData);
    };

    return (
        <EntitiesContext.Provider
            value={{
                products,
                addProduct,
                users,
                // addUser,
                favorites,
                addFavorite,
                removeFavorite,
                updateDetails,
                dataDetails,
                search,
                changeSearch,
                handleUnload,
                setsearchProducts,
                searchProducts
            }}
        >
            {children}
        </EntitiesContext.Provider>
    );

};

export const useEntitiesContext = () => {
    return useContext(EntitiesContext);
};
