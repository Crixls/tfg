import { createContext, useContext, useState } from "react";
import { createProduct } from "../api/useCases";

const EntitiesContext = createContext();


export const EntitiesProvider = (props) => {
    const { children } = props;
    // const [loadedData, setLoadedData] = useState(false);
    const [products, setProducts] = useState([]);
    // const [loadingUsers, setLoadingUsers] = useState(true);
    // const [brands, setBrands] = useState([]);
    // const [loadingBrands, setLoadingBrands] = useState(true);
    // const [accounts, setAccounts] = useState([]);
    // const [loadingAccounts, setLoadingAccounts] = useState(true);


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
                    imageFile: data.image,
                    image: data.image.name,
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
            console.error("Error al crear :", error);
        }
    };

    return (
        <EntitiesContext.Provider
          value={{
            products,
            addProduct,
            // addUser,
            // loadUsers,
            // loadingUsers,
            // brands,
            // addBrand,
            // loadBrands,
            // loadingBrands,
            // accounts,
            // addAccount,
            // loadAccounts,
            // loadingAccounts,
            // loadedData,
            // loadData,
          }}
        >
          {children}
        </EntitiesContext.Provider>
    );
};  

export const useEntitiesContext = () => {
    return useContext(EntitiesContext);
  };