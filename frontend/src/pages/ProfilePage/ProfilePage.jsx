import { useEffect, useState } from "react";
import { updateUser } from "../../api/api";
import Swal from "sweetalert2";
import {  getUsers } from "../../api/useCases";

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [roles, setRoles] = useState([]);
    const [passwordValid, setPasswordValid] = useState(false);
    const [useLogged, setUseLogged] = useState(false);



    useEffect(() => {
        const storedUser = localStorage.getItem('UserToken');
        if (storedUser) {
          setUseLogged(JSON.parse(storedUser));
        }
    }, []);


    useEffect(() => {
        const fetchApi = async () => {
          try {
            const data = await getUsers();
            const filterUser=(data.filter(user =>{
                const user2=user.username;
                return user2 === useLogged.login
            }));
            console.log(filterUser);
            setUser(filterUser[0]);
            console.log("Usuario:", data);
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        if (user) {
          setUsername(user.username || '');
          setEmail(user.email || '');
          setPassword(user.password||'');
          setRoles(user.roles||'');

        }
    }, [user]);


    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Validar la contraseña
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        setPasswordValid(regex.test(newPassword));
    
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Validar campos obligatorios
          if (!username || !email || !password) {
            console.error("Por favor complete todos los campos correctamente.");
            return;
          }
    
          const updatedUserData = {
            username,
            email,
            password,
            roles: roles

          };
    
          const response = await updateUser(user.id, updatedUserData);
    
          if (response) {
            Swal.fire({
              icon: 'success',
              title: '¡Usuario actualizado correctamente!',
              text: `El usuario ${username} ha sido actualizado exitosamente.`,
            });
          } else {
            console.error("Error al actualizar usuario");
          }
        } catch (error) {
          console.error("Error en la actualización del usuario:", error);
        }
      };


  return (
    <>
        <div className='p-10'>
            <p className='font-bold text-2xl'>MI CUENTA</p>
            <div className=" m-10 ">
                <form onSubmit={handleSubmit} className='flex flex-col  p-4'>
                <label className="text-lg font-bold ml-2 mb-2" htmlFor="username">Username *</label>
                <input
                    id="username"
                    type="text"
                    className="p-2 m-2 border border-gray-300 w-1/2 rounded-md"
                    placeholder="e.g. johndoe123"
                    style={{ marginBottom: '1rem' }}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label className="text-lg font-bold ml-2 mb-2" htmlFor="email">Email *</label>
                <input
                    id="email"
                    type="email"
                    className="p-2 m-2 border border-gray-300 w-1/2 rounded-md"
                    placeholder="e.g. example@example.com"
                    style={{ marginBottom: '1rem' }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label className="text-lg font-bold ml-2 mb-2" htmlFor="password">Password *</label>
                <div className='flex flex-col '>
                    <input
                    id="password"
                    type="password"
                    className="p-2 m-2 border border-gray-300 w-1/2 rounded-md"
                    placeholder="********"
                    style={{ marginBottom: '0.5rem', color: passwordValid ? 'green' : 'gray' }}
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                
                <button className=" bg-gray-500 text-white  mt-4 ml-2 w-20 p-2 rounded-lg text-center" type="submit">Guardar</button>
                </form>
            </div>
        </div>
      

    </>
  )
}

export default ProfilePage
