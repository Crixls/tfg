import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuthContext } from '../context/useAuthContext';
import { getUsers } from '../api/useCases';
import { useEntitiesContext } from '../context/useEntitiesContext';
import ProductsSearch from './ProductsSearch';

const Header = () => {
  const { logged, logout, userfinal } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSports, setModalOpenSports] = useState(false);
  const [modalOpenHambur, setModalOpenHambur] = useState(false);
  const [useLogged, setUseLogged] = useState('');
  const [adminLogged, setAdminLogged] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { changeSearch, search } = useEntitiesContext();
  const { setuserL } = useAuthContext();

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
  }, [setuserL]);

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

  const handleOpenSports = () => setModalOpenSports(true);
  const handleCloseSports = () => setModalOpenSports(false);
  const handleDoubleSports = () => setModalOpenSports(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleLogout = () => {
    logout();
    setAdminLogged(false);
    localStorage.setItem('isAdmin', false);
  };

  const handleSearch = () => changeSearch(true);

  useEffect(() => {
    localStorage.setItem('adminUser', JSON.stringify(adminLogged));
  }, [adminLogged]);

  useEffect(() => {
    const isAdmin = allUsers.some(user => user.username === useLogged.login && user.role === 'admin');
    localStorage.setItem('isAdmin', isAdmin);
  }, [allUsers, useLogged]);

  const handleOpenHambur = () => setModalOpenHambur(true);
  const handleCloseHambur = () => setModalOpenHambur(false);

  return (
    <header className="lg:text-white lg:flex lg:justify-between lg:items-center">
      <div className="lg:flex lg:items-center lg:bg-white lg:m-0 lg:p-0 md:justify-between">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo React" className="lg:w-40 lg:h-40 lg:mx-2" />
          </Link>
        </div>
        <div className='sm:mt-4 mt-2'>
          <span className="lg:text-4xl md:text-2xl sm:text-2xl lg:font-bold lg:flex">
            <span className="text-black sm:pl-2 pl-2">STREET</span>
            <span className="text-red-500 sm:pr-2 pr-2">PULSE</span>
          </span>
        </div>
      </div>
      <nav>
        <ul className="lg:flex sm:flex-wrap flex-wrap lg:space-x-12 lg:mx-10 lg:items-center">
          {search ? (
            <li>
              <ProductsSearch />
            </li>
          ) : (
            <li className="custom-cursor-pointer lg:custom-cursor-pointer" onClick={handleSearch}>
              <ion-icon name="search-outline" className="custom-cursor-pointer"></ion-icon>
            </li>
          )}
          {windowWidth > 769 ? (
            <>
              <li>
                <Link to="/man" className="hover:text-gray-400 noto-sans text-black">Hombre</Link>
              </li>
              <li>
                <Link to="/woman" className="hover:text-gray-400 noto-sans text-black">Mujer</Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-gray-400 noto-sans text-black">Niños</Link>
              </li>
              <li>
                <button className="noto-sans text-black p-1 rounded-md hover:text-gray-400" onClick={handleOpenSports}>
                  Deportes
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='flex md:ml-4 md:mr-4 sm:flex sm:p-1'>
                <ion-icon style={{ color: "black" }} name="menu-outline" onClick={handleOpenHambur}></ion-icon>
              </li>
            </>
          )}
          {modalOpenHambur && (
            <div className="fixed top-0 left-0 right-0 h-96 flex justify-center">
              <div className="bg-black w-screen p-6 mt-20 sm:mt-0">
                <ul className='flex items-center justify-center flex-col'>
                  <li className='p-1'>
                    <Link to="/man" className="hover:text-gray-400 noto-sans text-white">Hombre</Link>
                  </li>
                  <li className='p-1'>
                    <Link to="/woman" className="hover:text-gray-400 noto-sans text-white">Mujer</Link>
                  </li>
                  <li className='p-1'>
                    <Link to="/kids" className="hover:text-gray-400 noto-sans text-white">Niños</Link>
                  </li>
                  <li>
                    <button className="noto-sans text-white p-1 rounded-md font-bold hover:text-gray-400" onClick={handleOpenSports}>
                      Deportes
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {modalOpenSports && (
            <div onMouseLeave={handleCloseSports} className="lg:fixed lg:top-20 lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <div className="lg:bg-gray-200 lg:w-1/2 lg:p-6 lg:rounded-md md:flex md:flex-wrap">
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
          <li className="custom-cursor-pointer">
            <Link to="/favorites" className='lg:flex sm:flex sm:items-center lg:items-center'>
              <ion-icon name="heart-circle-outline" style={{ color: "black", padding: "1px" }}></ion-icon>
            </Link>
          </li>
          <li className="custom-cursor-pointer flex items-center md:flex md:items-center">
            <Link to="/cart" className='flex items-center'>
              <ion-icon name="bag-outline" style={{ color: "black", padding: "1px" }}></ion-icon>
            </Link>
          </li>
          <li>
            {logged ? (
              <>
                <div className='flex justify-content items-center'>
                  <div className='lg:mr-8 custom-cursor-pointer flex items-center' onClick={handleOpenModal}>
                    <ion-icon name="person-circle-outline" style={{ color: "black" }}></ion-icon>
                  </div>
                  <p className='noto-sans text-black p-1 sm:pl-1 rounded-md'>Hola, {userfinal?.name}</p>
                  {modalOpen && (
                    <div className="fixed top-40 right-0 flex justify-center items-center">
                      <div className="bg-black p-6">
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
            ) : (
              <Link to="/login" className='flex items-center md:ml-4 md:mr-4'>
                <ion-icon name="person-circle-outline" style={{ color: "black", padding: "1px" }}></ion-icon>
              </Link>
            )}
          </li>
          {adminLogged && (
            <li>
              <Link to="/admin" className='noto-sans text-black p-1 rounded-md'>Admin</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
