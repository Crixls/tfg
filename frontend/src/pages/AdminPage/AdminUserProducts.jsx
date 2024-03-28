import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/useCases';
import { deleteUser } from '../../api/api';
import ModalNewProduct from '../../components/Product/ModalNewProduct';
import ModalEditProduct from '../../components/Product/ModalEditProduct';
import CardUser from '../../components/User/CardUser';

const AdminUserProducts = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate= useNavigate();



    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await getUsers();
                setAllUsers(data);
                console.log("Users:", data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchApi();
    }, []);
  
    const handleCreateUser = () => {
        setOpen(true);
        setOpen2(false); // Asegúrate de cerrar ModalEditProduct si está abierto
    }

    const handleEditUser = (product) => {
        setSelectedUser(product); // Establecer el producto seleccionado
        setOpen2(true);
        setOpen(false); // Asegúrate de cerrar ModalNewProduct si está abierto
    }

    const handleCloseModal = () => {
        setOpen(false);
    };
  
    const handleCloseModal2 = () => {
        setOpen2(false);
    };

    const handleDeleteUser =(id)=>{
        deleteUser(id);
    }

    const handleReturn =()=>{
        navigate("../")
    }

    return (
        <>
            <h1 className='text-2xl p-4 text-white font-bold bg-blue-800'>Productos</h1>
            <div className="flex justify-center">
                <button onClick={handleCreateUser} className="bg-red-200 p-2 m-2">Crear producto</button>
            </div>
            <div className="flex justify-center">
                {open && <ModalNewProduct open={open} closeModal={handleCloseModal}/>}
            </div>
            <div className="flex justify-center">
                {open2 && <ModalEditProduct open={open2} closeModal={handleCloseModal2} product={selectedUser}/>}
            </div>
            
            <div className="grid grid-cols-3 gap-4 ">
                {allUsers.map((user, index) => (
                    <div key={index} className="flex justify-center flex-col items-center">
                        <CardUser typeShoe={user} />
                        <button className="bg-green-200 p-2 m-2" onClick={() => handleEditUser(user)}>Editar producto</button>
                        <button className="bg-purple-200 p-2 m-2" onClick={() => handleDeleteUser(user.id)}>Eliminar producto</button>
                    </div>
                ))}
            </div>
            <button className='bg-purple-200 p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}

export default AdminUserProducts

