// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUsers } from '../../api/useCases';
// import { deleteUser, post2, updateUser } from '../../api/api';
// import ModalNewUser from '../../components/User/ModalNewUser';
// import ModalEditUser from '../../components/User/ModalEditUser';
// import CardUser from '../../components/User/CardUser';

// const AdminUserProducts = () => {
//     const [allUsers, setAllUsers] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [open2, setOpen2] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchUsers(); // Llama a fetchUsers para cargar los usuarios iniciales
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const data = await getUsers();
//             setAllUsers(data);
//             console.log("Users:", data);
//         } catch (error) {
//             console.log("Error:", error);
//         }
//     };

//     const handleCreateUser = () => {
//         setOpen(true);
//         setOpen2(false); // Asegúrate de cerrar ModalEditUser si está abierto
//     }

//     const handleEditUser = (user) => {
//         setSelectedUser(user); // Establecer el usuario seleccionado
//         setOpen2(true);
//         setOpen(false); // Asegúrate de cerrar ModalNewUser si está abierto
//     }

//     const handleCloseModal = () => {
//         setOpen(false);
//     };

//     const handleCloseModal2 = () => {
//         setOpen2(false);
//     };

//     const handleDeleteUser = async (id) => {
//         await deleteUser(id);
//         fetchUsers(); // Actualiza la lista de usuarios después de eliminar uno
//     }

//     const handleReturn = () => {
//         navigate("../")
//     }

//     const handleUserCreated = async (newUserData) => {
//         await post2(newUserData); // Crea el nuevo usuario
//         fetchUsers(); // Actualiza la lista de usuarios después de crear uno
//         setOpen(false); // Cierra el modal después de crear un usuario
//     }

//     const handleUserUpdate = async (updatedUserData) => {
//         await updateUser(updatedUserData); // Edita el usuario
//         fetchUsers(); // Actualiza la lista de usuarios después de editar uno
//         setOpen2(false); // Cierra el modal después de editar un usuario
//     }

//     return (
//         <>
//             <h1 className='text-2xl p-4 text-white font-bold bg-blue-800'>Usuarios</h1>
//             <div className="flex justify-center">
//                 <button onClick={handleCreateUser} className="bg-red-200 p-2 m-2">Crear usuario</button>
//             </div>
//             <div className="flex justify-center">
//                 {open && <ModalNewUser open={open} closeModal={handleCloseModal} onUserCreated={handleUserCreated}/>}
//             </div>
//             <div className="flex justify-center">
//                 {open2 && <ModalEditUser open={open2} closeModal={handleCloseModal2} user={selectedUser} onUserUpdated={handleUserUpdate}/>}
//             </div>
            
//             <div className="grid grid-cols-3 gap-4 ">
//                 {allUsers.map((user, index) => (
//                     <div key={index} className="flex justify-center flex-col items-center">
//                         <CardUser user={user} />
//                         <button className="bg-green-200 p-2 m-2" onClick={() => handleEditUser(user)}>Editar usuario</button>
//                         <button className="bg-purple-200 p-2 m-2" onClick={() => handleDeleteUser(user.id)}>Eliminar usuario</button>
//                     </div>
//                 ))}
//             </div>
//             <button className='bg-purple-200 p-2' onClick={handleReturn}>Volver</button>
//         </>
//     )
// }

// export default AdminUserProducts;
   