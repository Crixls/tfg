import React, { useEffect, useState } from 'react'
import { getProducts } from '../../api/useCases';
import { deleteProduct } from '../../api/api';
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
        const fetchApi = async () => {
            try {
                const data = await getProducts();
                setAllShoes(data);
                console.log("Productos:", data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, []);
  
    const handleCrearProducto = () => {
        setOpen(true);
        setOpen2(false); // Asegúrate de cerrar ModalEditProduct si está abierto
    }

    const handleEditarProducto = (product) => {
        setSelectedProduct(product); // Establecer el producto seleccionado
        setOpen2(true);
        setOpen(false); // Asegúrate de cerrar ModalNewProduct si está abierto
    }

    const handleCloseModal = () => {
        setOpen(false);
    };
  
    const handleCloseModal2 = () => {
        setOpen2(false);
    };

    const handleEliminarProducto =(id)=>{
        deleteProduct(id);
    }

    const handleReturn =()=>{
        navigate("../")
    }

    return (
        <>
            <h1 className='text-2xl p-4 text-white font-bold bg-blue-800'>Productos</h1>
            <div className="flex justify-center">
                <button onClick={handleCrearProducto} className="bg-red-200 p-2 m-2">Crear producto</button>
            </div>
            <div className="flex justify-center">
                {open && <ModalNewProduct open={open} closeModal={handleCloseModal}/>}
            </div>
            <div className="flex justify-center">
                {open2 && <ModalEditProduct open={open2} closeModal={handleCloseModal2} product={selectedProduct}/>}
            </div>
            
            <div className="grid grid-cols-3 gap-4 ">
                {allShoes.map((manShoe, index) => (
                    <div key={index} className="flex justify-center flex-col items-center">
                        <CardShoes typeShoe={manShoe} />
                        <button className="bg-green-200 p-2 m-2" onClick={() => handleEditarProducto(manShoe)}>Editar producto</button>
                        <button className="bg-purple-200 p-2 m-2" onClick={() => handleEliminarProducto(manShoe.id)}>Eliminar producto</button>
                    </div>
                ))}
            </div>
            <button className='bg-purple-200 p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}

export default AdminPageProducts
