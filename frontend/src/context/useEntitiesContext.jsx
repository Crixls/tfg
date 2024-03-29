import { createContext, useContext, useState } from "react";
import { createProduct, deleteFavorite2, postFavorites } from "../api/useCases";

const EntitiesContext = createContext();

export const EntitiesProvider = (props) => {
    const { children } = props;
    const [products, setProducts] = useState([]);
    const [users] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [dataDetails, setDataDetails] = useState(null);

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
                },
            ]);
            return data;
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    // const addUser = async (userDTO) => {
    //     try {
    //         const data = await createUser(userDTO);
    //         console.log(data);
    //         if (!data) throw new Error(`Error en addUser: no se creó el usuario`);
    //         const newArrayUsers = [
    //             ...users,
    //             {
    //                 id: data.id,
    //                 password: data.password,
    //                 username: data.username,
    //                 email: data.email,
    //             },
    //         ];
    //         setUsers(newArrayUsers);
    //         return data;
    //     } catch (error) {
    //         console.error("Error al crear usuario:", error);
    //     }
    // };

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
                dataDetails
            }}
        >
            {children}
        </EntitiesContext.Provider>
    );

};

export const useEntitiesContext = () => {
    return useContext(EntitiesContext);
};
