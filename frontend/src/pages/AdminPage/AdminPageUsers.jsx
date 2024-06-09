import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api/useCases';
import { deleteUser } from '../../api/api';
import CardUser from '../../components/User/CardUser';
import ModalEditUser from '../../components/User/ModalEditUser';
import ModalNewUser from '../../components/User/ModalNewUser';
import Loaderanimated from '../../components/Loaderanimated'; 
import catchUsers from '../../components/User/catchUsers';
import fondo from "../../assets/favorite/favoritetext.jpg";

const AdminPageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(fetchUsers, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await catchUsers();
            setAllUsers(data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleCreateUser = () => {
        setOpen(true);
        setOpen2(false);
        fetchUsers();

    }

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setOpen2(true);
        setOpen(false);
        fetchUsers();
    }

    const handleCloseModal = () => {
        setOpen(false);
    };
  
    const handleCloseModal2 = () => {
        setOpen2(false);
    };

    const handleDeleteUser =async(id)=>{
        setLoading(true); 
        try {
            await deleteUser(id);
            fetchUsers();  
        } catch (error) {
            console.log("Error:", error);
        }finally {
                setLoading(false); 
         }
    }

    const handleReturn =()=>{
        navigate("../")
    }

    return (
        <>
            <div className="p-4 mt-10" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
                <p className="text-white flex w-full text-2xl font-bold">USUARIOS</p>
            </div>
            <div className="flex justify-center pt-10">
                <button onClick={handleCreateUser} className="bg-gray-300 font-medium rounded-lg p-4 m-2">Crear Usuario</button>
            </div>
            <div className="flex justify-center">
                {open && <ModalNewUser open={open} closeModal={handleCloseModal}/>}
            </div>
            <div className="flex justify-center">
                {open2 && <ModalEditUser open={open2} closeModal={handleCloseModal2} user={selectedUser}/>}
            </div>
            
            {loading ? ( 
                <div className="flex justify-center items-center mt-60">
                    <Loaderanimated />
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid  md:mt-10">
                    {allUsers.map((user, index) => (
                        <div key={index} className="flex justify-center flex-col items-center">
                            <CardUser user={user} />
                            <button className="bg-black rounded-lg text-white font-medium p-4 m-2"  onClick={() => handleEditUser(user)}>Editar usuario</button>
                            <button className="border-2 border-red-600 p-4 text-red-600 rounded-lg font-medium m-2" onClick={() => handleDeleteUser(user.id)}>Eliminar usuario</button>
                        </div>
                    ))}
                </div>
            )}
            <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
        </>
    )
}

export default AdminPageUsers;
