import  { useState } from 'react'
import { post2 } from '../../api/api';
import Swal from 'sweetalert2';

  const ModalNewUser = ({open, closeModal, onUserCreated}) => {
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
          onUserCreated(response); // Llama a la función onProductCreated con el nuevo producto

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
    <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
        <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
      </div>    
      <div className='flex justify-center items-center '>
          <form onSubmit={handleSubmit} className=' flex-col border-2 bg-gray-200 w-80 p-8 rounded-md'>
          <div  className='p-4'>
             <p style={{ marginBottom: '1rem' }}>
              A continuación usted va a registrar un nuevo usuario en su empresa.
              </p>
              <div>
              <label className='font-bold m-2' htmlFor="username">Username *: </label>
              <input
                  className='rounded-md m-2'
                  id="username"
                  type="text"
                  placeholder="e.g. johndoe123"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
              />
              </div>
              <div>
              <label className='font-bold m-2' htmlFor="email">Email *: </label>
              <input
                  className='rounded-md m-2'
                  id="email"
                  type="email"
                  placeholder="e.g. example@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
              />
              </div>
              <label className='font-bold m-2' htmlFor="password">Password *: </label>
              <div className='flex flex-col  justify-center'>

              <input
                  className='rounded-md m-2'
                  id="password"
                  type="password"
                  placeholder="********"
                  style={{ color: passwordValid ? 'green' : 'gray' }}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  // invalid={!passwordsMatch}
              />
              <input
                  className='rounded-md m-2'
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
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
              <div className='flex justify-center items-center'>
                <button className='pl-24 pr-24 p-2  mt-6 rounded-md bg-white border-2 border-black font-medium' type="submit">Enviar</button>
              </div>
          </div>
          </form>
    
      </div>
    </div>
  )

}

export default ModalNewUser
