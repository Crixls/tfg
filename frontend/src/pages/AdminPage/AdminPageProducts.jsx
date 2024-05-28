import React, { useEffect, useState } from 'react';
import { deleteProduct, postProduct, updateProduct } from '../../api/api';
import ModalNewProduct from '../../components/Product/ModalNewProduct';
import ModalEditProduct from '../../components/Product/ModalEditProduct';
import CardShoes from '../../components/CardShoes';
import { useNavigate } from 'react-router-dom';
import catchProducts from '../../components/catchProducts';
import Loaderanimated from '../../components/Loaderanimated';
import fondo from '../../assets/favorite/favoritetext.jpg';

const AdminPageProducts = () => {
    const [allShoes, setAllShoes] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    
    useEffect(() => {
        const intervalId = setInterval(fetchProducts, 5000);
        return () => clearInterval(intervalId);
    }, []);


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await catchProducts();
            setAllShoes(data);
            setProductsLoaded(true);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCrearProducto = () => {
        setOpen(true);
        setOpen2(false);
    }

    const handleEditarProducto = (product) => {
        setSelectedProduct(product);
        setOpen2(true);
        setOpen(false);
    }

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleCloseModal2 = () => {
        setOpen2(false);
    };

    const handleEliminarProducto = async (id) => {
        setLoading(true); // Mostrar loader
        try {
            await deleteProduct(id);
            fetchProducts();  // Refrescar la lista de productos después de eliminar
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false); // Ocultar loader
        }
    }

    const handleProductCreated = async (newProductData) => {
        setLoading(true); // Mostrar loader
        try {
            await postProduct(newProductData);
            fetchProducts();  // Refrescar la lista de productos después de crear uno nuevo
            setOpen(false);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false); // Ocultar loader
        }
    }

    const handleProductUpdated = async (updatedProductData) => {
        setLoading(true); // Mostrar loader
        try {
            await updateProduct(updatedProductData);
            fetchProducts();  // Refrescar la lista de productos después de actualizar uno
            setOpen2(false);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false); // Ocultar loader
        }
    }

    const handleReturn = () => {
        navigate("../")
    }

    return (
        <>
            <div className="p-4 mt-10" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <p className="text-white flex w-full text-2xl font-bold">PRODUCTOS</p>
            </div>
            <div className="flex justify-center pt-10">
                <button onClick={handleCrearProducto} className="bg-gray-300 font-medium rounded-lg p-4 m-2">Crear producto</button>
            </div>
            <div className="flex justify-center">
                {open && <ModalNewProduct open={open} closeModal={handleCloseModal} onProductCreated={handleProductCreated} />}
            </div>
            <div className="flex justify-center">
                {open2 && <ModalEditProduct open={open2} closeModal={handleCloseModal2} product={selectedProduct} onProductUpdated={handleProductUpdated} />}
            </div>
            {loading && !productsLoaded ? (
                <div className="flex justify-center items-center mt-60">
                    <Loaderanimated />
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid md:mt-10">
                    {allShoes.map((manShoe, index) => (
                        <div key={index} className="flex justify-center flex-col items-center sm:mt-28 sm:mb-28 sm:gap-2">
                            <CardShoes typeShoe={manShoe} />
                            <button className="bg-black rounded-lg text-white font-medium p-4 m-2 mt-8" onClick={() => handleEditarProducto(manShoe)}>Editar producto</button>
                            <button className="border-2 border-red-600 p-4 text-red-600 rounded-lg font-medium m-2" onClick={() => handleEliminarProducto(manShoe.id)}>Eliminar producto</button>
                        </div>
                    ))}
                </div>
            )}
            <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}

export default AdminPageProducts;
