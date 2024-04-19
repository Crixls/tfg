import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Ajusta la ruta al archivo SVG de tu logo
import { useAuthContext } from '../context/useAuthContext';
import { getUsers } from '../api/useCases';
// import ProductsSearch from './ProductsSearch';
import { useEntitiesContext } from '../context/useEntitiesContext';
import ProductsSearch from './ProductsSearch';

const Header = () => {
  const {logged, logout } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSports, setModalOpenSports] = useState(false);
  const [useLogged, setUseLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  // const [search, setsearch] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const {changeSearch,search} = useEntitiesContext();




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



  const handleOpenSports = () => {
    setModalOpenSports(true);
  };


  const handleCloseSports = () => {
    setModalOpenSports(false);
  };

  const handleDoubleSports = () => {
    setModalOpenSports(false); 
  };



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

  const handleSearch=() => {
    changeSearch(true);
    // setsearch(true);
  }


  
  useEffect(() => {
    localStorage.setItem('adminUser', JSON.stringify(adminLogged));
  }, [adminLogged]);

  useEffect(() => {
    const isAdmin = allUsers.some(user => user.username === useLogged.login && user.roles.includes('ROLE_ADMIN'));
    localStorage.setItem('isAdmin', isAdmin);
  }, [allUsers, useLogged]);


  return (
    <header className=" text-white flex justify-between items-center font-bold font-sans " style={{ backgroundImage: 'url(/src/assets/Texturelabs_Grunge_277M.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="flex items-center bg-white m-0 p-0">
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
        <ul className="flex space-x-12 mx-10 justify-center items-center bg-white p-1 pl-2 pr-2 rounded-md">
          <li>
            <Link to="/man" className="hover:text-gray-400 noto-sans text-black p-1 rounded-md">
              Hombre
            </Link>
          </li>
          <li>
            <Link to="/woman" className="hover:text-gray-400 noto-sans  text-black p-1 rounded-md">Mujer</Link>
          </li>
          <li >
            <Link to="/kids" className="hover:text-gray-400 noto-sans  text-black p-1 rounded-md">Niña/o</Link>
          </li>
          <li >
            <button 
              className="noto-sans text-black p-1 rounded-md hover:text-gray-400" 
              onMouseEnter={handleOpenSports} 
              onMouseLeave={handleCloseSports} 
            >
              Deportes
            </button>
          </li>
          {modalOpenSports && (
            <div className="fixed top-0 left-0 right-0  h-96 flex justify-center items-center " onMouseEnter={handleOpenSports} onMouseLeave={handleCloseSports}>
              <div className="bg-gray-200 w-1/2 p-6  rounded-md ">
                <ul className='flex items-center justify-center'>
                  <li className='pr-10'>
                    <Link to="/futbol" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Fútbol</p>
                    </Link>
                  </li>
                  <li className='pr-10'>
                    <Link to="/basket" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Baloncesto</p>
                    </Link>
                  </li>
                  <li className='pr-10'>
                    <Link to="/badminton" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Badminton</p>
                    </Link>
                  </li>
                  <li className='pr-10'>
                    <Link to="/running" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Running</p>
                    </Link>
                  </li>
                  <li className='pr-10'>
                    <Link to="/fitness" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Fitness</p>
                    </Link>
                  </li>
                  <li className='pr-10'>
                    <Link to="/tenis" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Tenis</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

         
          {search ? 
            <li>
              <ProductsSearch></ProductsSearch>
            </li>
          : 
            <li className="custom-cursor-pointer flex items-center " onClick={handleSearch}>
              <ion-icon name="search-outline"  style={{color:"black", padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
            </li> 
          }

          <li className="custom-cursor-pointer ">
            <Link to="/favorites" className='flex items-center'>
              <ion-icon name="heart-circle-outline" style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
            </Link>
          </li>
          <li  className="custom-cursor-pointer flex items-center">
            <Link to="/cart" className='flex items-center'>
              <ion-icon name="bag-outline"  style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>   
            </Link>
          </li>
          <li>
          {logged ? (
              <>
                <div className='flex justify-content items-center'>
                  <div className='mr-8 custom-cursor-pointer flex items-center'>
                    <ion-icon name="person-circle-outline" style={{color:"black", padding:"1px", borderRadius: "0.375rem"}} onClick={handleOpenModal} onDoubleClick={handleDoubleClick} className="cursor-pointer"></ion-icon>
                  </div>
                  <p className='noto-sans text-black p-1 rounded-md'>Hola {useLogged && useLogged.login}</p>
                  {modalOpen && (
                    <div className="fixed top-40 right-0  flex justify-center items-center">
                      <div className="bg-black p-6 ">
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
              <Link to="/login" className='flex items-center'>
                <ion-icon name="person-circle-outline"  style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
              </Link>
            )}
          </li>
          {adminLogged && (
            <li>
              <button onClick={handlePanel} className='noto-sans text-black p-1 rounded-md'>Panel Administrador</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
