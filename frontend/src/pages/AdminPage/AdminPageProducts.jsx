import  { useEffect, useState } from 'react'
import { getProducts } from '../../api/useCases';
import { deleteProduct, postProduct, updateProduct } from '../../api/api';
import ModalNewProduct from '../../components/Product/ModalNewProduct';
import ModalEditProduct from '../../components/Product/ModalEditProduct';
import CardShoes from '../../components/CardShoes';
import { useNavigate } from 'react-router-dom';

const AdminPageProducts = () => {
    const [allShoes, setAllShoes] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate= useNavigate();


    useEffect(() => {
        fetchProducts(); // Llama a fetchProducts para cargar los productos iniciales
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setAllShoes(data);
            console.log("Productos:", data);
        } catch (error) {
            console.log("Error:", error);
        }
    };
  
    const handleCrearProducto = () => {
        setOpen(true);
        setOpen2(false); // Asegúrate de cerrar ModalEditProduct si está abierto
    }

    const handleEditarProducto = (product,onProductEdited) => {
        setSelectedProduct(product); // Establecer el producto seleccionado
        setOpen2(true);
        setOpen(false); // Asegúrate de cerrar ModalNewProduct si está abierto
    }

    const handleCloseModal =  () => {
        setOpen(false);
    };
  
    const handleEliminarProducto = async (id) => {
        await deleteProduct(id);
        fetchProducts(); // Actualiza la lista de productos después de eliminar uno
    }
    const handleCloseModal2 = () => {
       
        setOpen2(false);
    };

    const handleProductCreated = async (newProductData) => {
        await postProduct(newProductData); // Crea el nuevo producto
        fetchProducts(); // Actualiza la lista de productos después de crear uno
        setOpen(false); // Cierra el modal después de crear un producto
    }

    const handleProductUpdated = async (updatedProductData) => {
        await updateProduct(updatedProductData); // Edita el producto
        fetchProducts(); // Actualiza la lista de productos después de editar uno
        setOpen2(false); // Cierra el modal después de editar un producto
    }

    
    const handleReturn =()=>{
        navigate("../")
    }

    return (
        <>
            <div className="p-4 mt-10" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
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
            
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid md:mt-10">
                {allShoes.map((manShoe, index) => (
                    <div key={index} className="flex justify-center flex-col items-center  sm:mt-28 sm:mb-28 sm:gap-2">

                        <CardShoes typeShoe={manShoe} />
                        <button className="bg-black rounded-lg text-white font-medium p-4 m-2" onClick={() => handleEditarProducto(manShoe)}>Editar producto</button>
                        <button className="border-2 border-red-600 p-4 text-red-600 rounded-lg font-medium m-2" onClick={() => handleEliminarProducto(manShoe.id)}>Eliminar producto</button>
                    </div>
                ))}
            </div>
            <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}

export default AdminPageProducts
