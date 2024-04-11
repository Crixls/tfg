import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { updateProduct, updateUser } from '../../api/api';

const ModalEditUser = ({ user, open, closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPassword(user.password||'');
      setConfirmPassword(user.password || '');
      setRoles(user.roles||'');
    }
  }, [user]);

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
    } finally {
      closeModal();
    }
  };

  return (
    <div className={`modal ${open ? 'open' : 'closed'}`}>
      <div className=" m-10 ">
        <div className="cursor-pointer" onClick={closeModal}>
          <ion-icon name="close"></ion-icon>
        </div>
        <form onSubmit={handleSubmit} className='bg-gray-500 flex flex-col justify-center items-center p-4'>
          <label htmlFor="username" className='font-bold text-white'>Username *:</label>
          <input
            id="username"
            type="text"
            placeholder="e.g. johndoe123"
            style={{ marginBottom: '1rem' }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label htmlFor="email" className='font-bold text-white'>Email *</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. example@example.com"
            style={{ marginBottom: '1rem' }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="roles" className='font-bold text-white'>Roles *</label>
          <textarea
            id="roles"
            style={{ marginBottom: '1rem' }}
            value={roles.join(', ')} // Convertimos el array a una cadena para mostrar en el textarea
            onChange={(event) => setRoles(event.target.value.split(',').map(role => role.trim()))} // Convertimos la cadena a un array al cambiar el valor
          />

          <label htmlFor="password" className='font-bold text-white'>Password *</label>
          <div className='flex flex-col items-center justify-center'>
            <input
              id="password"
              type="password"
              placeholder="********"
              className='text-white'
              style={{ marginBottom: '0.5rem', color: passwordValid ? 'green' : 'gray' }}
              value={password}
              onChange={handlePasswordChange}
              />
            <input
              id="confirmPassword"
              type="password"
              placeholder="********"
              style={{ marginBottom: '0.5rem' }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              />
            {!passwordsMatch && <p style={{ color: 'red', fontSize: '0.8rem' }}>Las contraseñas no coinciden</p>}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'white' }}>
            Los campos marcados con * son obligatorios.
          </p>
          <button type="submit" className='p-4 bg-white font-medium rounded-md mt-6'>Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
