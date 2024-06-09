import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; 
import fondo from '../assets/Texturelabs_Grunge_277M.jpg'
import { useAuthContext } from '../context/useAuthContext';
import { getUsers } from '../api/useCases';
// import ProductsSearch from './ProductsSearch';
import { useEntitiesContext } from '../context/useEntitiesContext';
import ProductsSearch from './ProductsSearch';

const Header = () => {
  const {logged, logout,userfinal } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSports, setModalOpenSports] = useState(false);
  const [modalOpenHambur, setModalOpenHambur] = useState(false);
  const [useLogged, setUseLogged] = useState('');
  const [adminLogged, setAdminLogged] = useState(false);
  // const [search, setsearch] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



  const {changeSearch,search} = useEntitiesContext();
  const {setuserL} = useAuthContext();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUseLogged(JSON.parse(storedUser));
      setuserL(JSON.parse(storedUser));
    }
  }, []);

 
  useEffect(() => {
        const userId = localStorage.getItem('userId');
        setAdminLogged(Number(userId) === 3);
  }, []);





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

  const handleOpenHambur =()=>{
    setModalOpenHambur(true);
  }

  const handleCloseHambur =()=>{
    setModalOpenHambur(false);
  }

  


  return (
    <header className=" lg:text-white lg:flex lg:justify-between lg:items-center md:text-white sm:text-white md:flex md:justify-between sm:justify-between md:items-center sm:items-center font-bold font-sans sm:h-28 md:h-40 lg:h-40 sm:flex flex items-center justify-between  h-28 text-white " style={{ backgroundImage:  `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="lg:flex lg:items-center lg:bg-white lg:m-0 lg:p-0  md:justify-center sm:justify-center md:h-40 md:flex md:items-center md:bg-white md:m-0 md:p-0 sm:flex sm:items-center sm:bg-white sm:h-28 bg-white flex items-center h-28">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo React" className="lg:w-40 lg:h-40 lg:mx-2 lg:max-w-40 md:max-w-32 md:w-40  md:mx-2 sm:w-32 sm:max-w-20 sm:mx-2 w-28 mx-2 max-w-20" />
          </Link>
        </div>
        <div className='sm:mt-4 mt-2'>
          <span className="lg:text-4xl md:text-2xl sm:text-2xl lg:font-bold lg:mx-5 timmana-regular lg:text-center lg:pt-4 md:mx-1 md:flex md:justify-center md:items-center mx-1 flex justify-center items-center  ">
            <span className="text-black sm:pl-2 pl-2">STREET</span>
            <span className="text-red-500 sm:pr-2 pr-2">PULSE</span>
          </span>
        </div>
      </div>
      {/* Enlaces a distintas partes de la web */}
      <nav>
        <ul className="lg:flex sm:flex-wrap flex-wrap lg:space-x-12 lg:mx-10 lg:justify-center lg:items-center lg:bg-white lg:p-1 lg:pl-2 lg:pr-2 lg:rounded-md md:mx-4 md:p-1 md:justify-center sm:justify-center md:items-center md:m-2 sm:m-2 md:bg-white sm:bg-white justify-center  bg-white md:flex md:rounded-md sm:rounded-md rounded-md md:flex-wrap sm:flex flex sm:items-center items-center sm:mx-4 mx-4 sm:p-1 p-1">

          {search ? 
              <li>
                <ProductsSearch></ProductsSearch>
              </li>
            : 
              <li className="custom-cursor-pointer lg:custom-cursor-pointer lg:flex lg:items-center  md:custom-cursor-pointer sm:p-1 md:flex sm:flex sm:items-center md:items-center md:ml-4 md:mr-4 flex items-center ml-1 mr-1 before:" onClick={handleSearch}>
                <ion-icon name="search-outline" className="custom-cursor-pointer"  style={{color:"black", padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
              </li> 
            }

        {windowWidth > 769 ? (
            <>
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
                    onClick={handleOpenSports} 
                  >
                    Deportes
                  </button>
                </li>
            
            </>
         
          ):(
            <>
              <li className='flex md:ml-4 md:mr-4 sm:flex sm:p-1'>
                <ion-icon style={{color:"black"}} name="menu-outline"  onClick={handleOpenHambur}  onMouseLeave={handleCloseHambur} ></ion-icon>
              </li>

            </>
            
          )}

          {modalOpenHambur && (
            <div className="fixed top-0 left-0 right-0  h-96 flex justify-center items-center " onMouseEnter={handleOpenHambur} onMouseLeave={handleCloseHambur}>
              <div className="bg-black w-screen p-6 mt-20 sm:mt-0 ">
                <ul className='flex items-center justify-center flex-col'>
                  <li className='p-1'>
                    <Link to="/man" className="hover:text-gray-400 noto-sans font-bold text-white  rounded-md">
                      Hombre
                    </Link>
                  </li>
                  <li className='p-1'>
                    <Link to="/woman" className="hover:text-gray-400 noto-sans font-bold text-white  rounded-md">Mujer</Link>
                  </li>
                  <li className='p-1'>
                    <Link to="/kids" className="hover:text-gray-400 noto-sans font-bold text-white  rounded-md">Niña/o</Link>
                  </li>
                  <li >
                    <button 
                      className="noto-sans text-white p-1 rounded-md font-bold hover:text-gray-400" 
                      onClick={handleOpenSports} 
                    >
                      Deportes
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}


          {modalOpenSports && (
            <div  onMouseLeave={handleCloseSports}  className="lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:h-96 lg:flex lg:justify-center lg:items-center  md:fixed md:top-0 md:left-0 md:right-0 md:h-12 md:flex md:justify-center md:items-center md:mt-40 lg:mt-1 sm:fixed sm:top-0 sm:left-0 sm:right-0 sm:h-96 sm:flex sm:justify-center sm:items-center sm:mt-32 fixed top-0 left-0 right-0 h-96 flex justify-center items-center mt-32" onMouseEnter={handleOpenSports} >
              <div className="lg:bg-gray-200 lg:w-1/2 lg:p-6   lg:rounded-md md:bg-gray-200 md:w-screen md:p-5 md:rounded-md sm:rounded-md sm:bg-gray-200 sm:w-screen sm:p-5 rounded-md bg-gray-200 w-screen">
                <ul className='flex items-center justify-center sm:flex-wrap flex-wrap'>
                  <li className='pr-10 pt-2'>
                    <Link to="/futbol" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Fútbol</p>
                    </Link>
                  </li>
                  <li className='pr-10 pt-2'>
                    <Link to="/basket" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Baloncesto</p>
                    </Link>
                  </li>
                  <li className='pr-10 pt-2'>
                    <Link to="/badminton" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Badminton</p>
                    </Link>
                  </li>
                  <li className='pr-10 pt-2'>
                    <Link to="/running" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Running</p>
                    </Link>
                  </li>
                  <li className='pr-10 pt-2'>
                    <Link to="/fitness" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Fitness</p>
                    </Link>
                  </li>
                  <li className='pr-10 pt-2'>
                    <Link to="/tenis" onClick={handleCloseSports}>
                      <p className='noto-sans text-black text-lg'>Tenis</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

         
       
          <li className="custom-cursor-pointer ">
            <Link to="/favorites" className='lg:flex sm:flex sm:items-center lg:items-center sm:mr-1 sm:p-1 md:flex md:items-center md:ml-4 md:mr-4  flex items-center'>
              <ion-icon name="heart-circle-outline" style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
            </Link>
          </li>
          <li  className="custom-cursor-pointer flex items-center md:flex md:items-center sm:p-1 md:ml-4 md:mr-4">
            <Link to="/cart" className='flex items-center'>
              <ion-icon name="bag-outline"  style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>   
            </Link>
          </li>
          <li>
          {logged ? (
              <>
                <div className='flex justify-content items-center '>
                  <div className='lg:mr-8 custom-cursor-pointer flex items-center md:flex md:items-center md:ml-2 md:mr-4'>
                    <ion-icon name="person-circle-outline" style={{color:"black", padding:"1px", borderRadius: "0.375rem"}} onClick={handleOpenModal} onDoubleClick={handleDoubleClick} className="cursor-pointer"></ion-icon>
                  </div>
                  <p className='noto-sans text-black p-1 sm:pl-1 rounded-md'>Hola {useLogged ? useLogged.login : ''}</p>
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
              <Link to="/login" className='flex items-center md:ml-4 md:mr-4'>
                <ion-icon name="person-circle-outline"  style={{color:"black",padding:"1px", borderRadius: "0.375rem"}}></ion-icon>
              </Link>
            )}
          </li>
          {adminLogged && (
		
            <li>
         	    <Link to="/admin" className='noto-sans text-black p-1 rounded-md'>Panel Administrador</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
