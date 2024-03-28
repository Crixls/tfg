import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Ajusta la ruta al archivo SVG de tu logo
import { useAuthContext } from '../context/useAuthContext';
import { getUsers } from '../api/useCases';

const Header = () => {
  const {logged, logout } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [useLogged, setUseLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUseLogged(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const adminUser = localStorage.getItem('isAdmin');
    if (adminUser) {
      setAdminLogged(JSON.parse(adminUser));
    }
  }, [allUsers, useLogged]);

  useEffect(() => {
      const fetchApi = async () => {
          try {
              const data = await getUsers();
              setAllUsers(data);
          } catch (error) {
              console.log("Error:", error);
          }
      };
      fetchApi();
  }, []);



  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDoubleClick = () => {
    setModalOpen(false); 
  };

  const handlePanel=()=>{
    navigate("/admin");
  }

  const handleLogout = () => {
    logout();
    setAdminLogged(false);
    localStorage.setItem('isAdmin', false);

  }


  
  useEffect(() => {
    localStorage.setItem('adminUser', JSON.stringify(adminLogged));
  }, [adminLogged]);

  useEffect(() => {
    const isAdmin = allUsers.some(user => user.username === useLogged.login && user.roles.includes('ROLE_ADMIN'));
    localStorage.setItem('isAdmin', isAdmin);
  }, [allUsers, useLogged]);


  return (
    <header className="bg-blue-200 text-white pl-4 pr-4 flex justify-between items-center font-bold font-sans">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo React" className="w-40 h-40 mx-2" />
        </Link>
        <span className="text-4xl font-bold mx-5 timmana-regular text-center pt-4">
          <span className="text-black">STREET</span>
          <span className="text-red-500">PULSE</span>
        </span>
      </div>
      {/* Enlaces a distintas partes de la web */}
      <nav>
        <ul className="flex space-x-12 mx-10 justify-center items-center">
          <li>
            <Link to="/man" className="hover:text-gray-400 noto-sans">
              Hombre
            </Link>
          </li>
          <li>
            <Link to="/woman" className="hover:text-gray-400 noto-sans">Mujer</Link>
          </li>
          <li>
            <Link to="/kids" className="hover:text-gray-400 noto-sans">Niña/o</Link>
          </li>
          <li className="custom-cursor-pointer">
            <ion-icon name="search-outline"></ion-icon>
          </li> 
          <li>
            <Link to="/favorites">
              <ion-icon name="heart-circle-outline"></ion-icon>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ion-icon name="bag-outline"></ion-icon>   
            </Link>
          </li>
          <li>
          {logged ? (
              <>
                <div className='flex justify-content items-center'>
                  <div className='mr-8 custom-cursor-pointer'>
                    <ion-icon name="person-circle-outline" onClick={handleOpenModal} onDoubleClick={handleDoubleClick} className="cursor-pointer"></ion-icon>
                  </div>
                  <p className='noto-sans'>Hola {useLogged && useLogged.login}</p>
                  {modalOpen && (
                    <div className="fixed top-40 right-0  flex justify-center items-center">
                      <div className="bg-blue-300 p-6 ">
                      <ul>
                        <li className='p-2'>
                          <Link to="/profile" onClick={handleCloseModal}>
                            <p className='noto-sans'>Perfil</p>
                          </Link>
                        </li>
                        <li className='p-2'>
                          <Link to="/orders" onClick={handleCloseModal}>
                            <p className='noto-sans'>Pedidos</p>
                          </Link>
                        </li>
                        <li className='p-2'>
                          <Link to="/favorites" onClick={handleCloseModal}>
                            <p className='noto-sans'>Favoritos</p>
                          </Link>
                        </li>
                        <li className='p-2'>
                          <button onClick={handleLogout} className='noto-sans'>Cerrar sesión</button>
                        </li>
                      </ul>
                    </div>
                    </div>
                  )}
                </div>
              </>
            ): (
              <Link to="/login">
                <ion-icon name="person-circle-outline"></ion-icon>
              </Link>
            )}
          </li>
          {adminLogged && (
            <li>
              <button onClick={handlePanel} className='noto-sans'>Panel Administrador</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
