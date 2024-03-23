import  { useState } from 'react'
import Swal from 'sweetalert2';
import { useEntitiesContext } from '../context/useEntitiesContext';
import { post2 } from '../api/api';

const UserRegisterForm = (props) => {
    const { open, closeModal } = props;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(false);

  
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
        //   handleModalClose(); // Cerrar el modal después de enviar el formulario
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
        <div className='flex justify-center items-center h-full m-80'>
            <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col bg-green-100 w-80 p-4'>
                <p style={{ marginBottom: '1rem' }}>
                A continuación usted va a registrar un nuevo usuario en su empresa.
                </p>
                <div>
                <label htmlFor="username">Username *</label>
                <input
                    id="username"
                    type="text"
                    placeholder="e.g. johndoe123"
                    style={{ marginBottom: '1rem' }}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="email">Email *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="e.g. example@example.com"
                    style={{ marginBottom: '1rem' }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                </div>
                <label htmlFor="password">Password *</label>
                <div className='flex flex-col items-center justify-center'>

                <input
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
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6f6f6f' }}>
                Los campos marcados con * son obligatorios.
                </p>
                <button type="submit">Enviar</button>
            </form>

        </div>
    )
        
}

export default UserRegisterForm
