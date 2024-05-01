import  { useState } from 'react'
import Swal from 'sweetalert2';
import { useEntitiesContext } from '../context/useEntitiesContext';
import { post2 } from '../api/api';
import { useNavigate } from 'react-router-dom';

const UserRegisterForm = (props) => {
    const { open, closeModal } = props;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate= useNavigate();

  
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Validar la contraseña
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        setPasswordValid(regex.test(newPassword));
        // Comprobar si las contraseñas coinciden
        if (confirmPassword && newPassword !== confirmPassword) {
          setPasswordsMatch(false);
        } else {
          setPasswordsMatch(true);
        }
    };
  
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        // Comprobar si las contraseñas coinciden
        if (password && newConfirmPassword !== password) {
          setPasswordsMatch(false);
        } else {
          setPasswordsMatch(true);
        }
      };


    const handleSubmit = async () => {
        try {
          // Validar campos obligatorios
          if (!username  || !email || !password ) {
            console.error("Por favor complete todos los campos correctamente.");
            return;
          }
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
      
          const response = await post2(formData);

          navigate("/login");

          console.log(response);
          if (response) {
            // Si el usuario se creó correctamente, mostrar una alerta de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Usuario creado correctamente!',
              text: `El usuario ${username} ha sido creado exitosamente.`,
            });
          } else {
            console.error("Error al registrar usuario");
          }
        } catch (error) {
          console.error("Error en la solicitud de registro:", error);
        } finally {
          navigate("/login");
        }
    };

    // const handleModalClose = () => {
    //     // setOpen(false); // Cerrar el modal
    //     closeModal();
    //     // Resetear los estados del formulario
    //     setUsername("");
    //     setEmail("");
    //     setPassword("");
    //     setConfirmPassword("");
    //     setPasswordValid(false);
    //     setPasswordsMatch(true);
    // };

  
    return (
      <div className=' flex justify-center'>
        <div className='flex w-1/2 justify-center items-center m-40 bg-gray-100 rounded-md'>
            <form onSubmit={handleSubmit} className='flex justify-center  flex-col  rounded-md p-12'>
                <p style={{ marginBottom: '1rem' }}>
                Introduce tu dirección de correo electrónico para registrarte.
                </p>
                <div className='flex flex-col'>
                <label className='font-bold text-lg' htmlFor="username">Nombre usuario</label>
                <input
                    className='mb-4 rounded-sm p-1'
                    id="username"
                    type="text"
                    style={{ marginBottom: '1rem' }}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                </div>
                <div className='flex flex-col '>
                <label className='font-bold text-lg' htmlFor="email">Email</label>
                <input
                    className='mb-4 rounded-sm p-1'
                    id="email"
                    type="email"
                    style={{ marginBottom: '1rem' }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                </div>
                <label className='font-bold text-lg' htmlFor="password">Password</label>
                <div className='flex flex-col '>

                <input
                    className='rounded-md p-1'
                    id="password"
                    type="password"
                    placeholder="********"
                    style={{ marginBottom: '0.5rem', color: passwordValid ? 'green' : 'gray' }}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    // invalid={!passwordsMatch}
                />
                <input
                    className='rounded-md p-1'
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    style={{ marginBottom: '0.5rem' }}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    // invalid={!passwordsMatch}
                />
                {!passwordsMatch && <p style={{ color: 'red', fontSize: '0.8rem' }}>Las contraseñas no coinciden</p>}
                </div>
                <div className='flex justify-center items-center flex-col'>
                  <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6f6f6f' }}>
                  Los campos marcados con * son obligatorios.
                  </p>
                  <div className='p-10'>
                    <button className="bg-gray-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">Registrarme</button>
                  </div>
                </div>
              
            </form>

        </div>
      </div>
    )
        
}

export default UserRegisterForm
