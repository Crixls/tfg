import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/useCases';
import { deleteUser } from '../../api/api';
import CardUser from '../../components/User/CardUser';
import ModalEditUser from '../../components/User/ModalEditUser';
import ModalNewUser from '../../components/User/ModalNewUser';

const AdminPageUsers = () => {
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

    const handleEditUser = (user) => {
        setSelectedUser(user); // Establecer el producto seleccionado
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
            <h1 className='text-2xl p-4 text-white font-bold bg-blue-800'>Usuarios</h1>
            <div className="flex justify-center">
                <button onClick={handleCreateUser} className="bg-red-200 p-2 m-2">Crear Usario</button>
            </div>
            <div className="flex justify-center">
                {open && <ModalNewUser open={open} closeModal={handleCloseModal}/>}
            </div>
            <div className="flex justify-center">
                {open2 && <ModalEditUser open={open2} closeModal={handleCloseModal2} user={selectedUser}/>}
            </div>
            
            <div className="grid grid-cols-3 gap-4 ">
                {allUsers.map((user, index) => (
                    <div key={index} className="flex justify-center flex-col items-center">
                        <CardUser user={user} />
                        <button className="bg-green-200 p-2 m-2" onClick={() => handleEditUser(user)}>Editar usuario</button>
                        <button className="bg-purple-200 p-2 m-2" onClick={() => handleDeleteUser(user.id)}>Eliminar usuario</button>
                    </div>
                ))}
            </div>
            <button className='bg-purple-200 p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}


export default AdminPageUsers
