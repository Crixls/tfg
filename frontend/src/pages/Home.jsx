import { useEffect, useState } from "react";
import { getUsers } from "../api/useCases";
import { postOrderEntity } from "../api/api";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/useAuthContext";
import CardShoes from "../components/CardShoes";
import { useEntitiesContext } from '../context/useEntitiesContext';
import miImagen from '../assets/home/zapa2.webp';
import airjordan from '../assets/home/airjordan.webp';
import circuit from '../assets/home/circuit-last.webp';
import Render from "../components/Render";
import Loaderanimated from "../../src/components/Loaderanimated";
import catchProducts from "../components/catchProducts";
import catchEntities from "../components/catchEntities";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderUser, setOrderUser] = useState(null);
  const [useLogged, setUseLogged] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const { setUserLogged, setUsers2 } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { handleUnload } = useEntitiesContext();

  // Manejar el evento de redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Obtener todos los usuarios y establecer el usuario autenticado
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setAllUsers(usersData);
        setUsers2(usersData);

        const storedUser = localStorage.getItem('UserToken');
        if (storedUser) {
          setUseLogged(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  // Obtener productos
  useEffect(() => {
    handleUnload();

    const fetchProducts = async () => {
      try {
        const storedProducts = localStorage.getItem('allProducts');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts).filter(product => product.new === 1));
        } else {
          const fetchedProducts = await catchProducts();
          setProducts(fetchedProducts.filter(product => product.new === 1));
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  // Verificar el estado del usuario autenticado
  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUseLogged(JSON.parse(storedUser));
    }
  }, []);

  // Obtener y verificar las entidades
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await catchEntities();
        const filteredOrder = data.filter(order => {
          const userId = parseInt(order.user.split('/').pop(), 10);
          const foundUser = allUsers.find(user => user.username === useLogged.login);
          if (foundUser) {
            setIdUser(parseInt(foundUser.id, 10));
            setUserLogged(parseInt(foundUser.id, 10));
            localStorage.setItem('userId', foundUser.id); // Almacena el ID del usuario en localStorage
            return userId === foundUser.id;
          }
          return false;
        });

        setOrderUser(filteredOrder);

        if (filteredOrder.length === 0 && idUser !== null) {
          const orderEntityData = {
            user: `/api/users/${idUser}`,
            date: new Date().toISOString(),
            state: 0,
            total: 0
          };

          const response = await postOrderEntity(orderEntityData);

          if (response) {
            Swal.fire({
              icon: 'success',
              title: '¡Tenemos el carrito correctamente!',
              text: `El usuario ${idUser} ha sido actualizado exitosamente.`,
            });
          } else {
            console.error("Error al actualizar usuario");
          }
        }

        const allOrdersStateOne = filteredOrder.every(order => order.state === 1);
        if (allOrdersStateOne) {
          try {
            const orderEntityData = {
              user: `/api/users/${idUser}`,
              date: new Date().toISOString(),
              state: 0,
              total: 0
            };
            const response = await postOrderEntity(orderEntityData);

            if (response) {
              Swal.fire({
                icon: 'success',
                title: '¡Tenemos el carrito correctamente!',
                text: `El usuario ${idUser} ha sido actualizado exitosamente.`,
              });
              setLoading(false);
            } else {
              console.error("Error al actualizar usuario");
            }
          } catch (error) {
            console.error("Error al crear una nueva orderentitydata:", error);
          }
        }

        if (filteredOrder.some(order => order.state === 0)) {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (allUsers.length > 0 && useLogged) {
      fetchEntities();
    }
  }, [allUsers, useLogged, idUser]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ) : (
        <>
          <div className="lg:items-center lg:flex lg:p-10 md:p-10 md:flex md:flex-col md:justify-center md:items-center sm:p-10 sm:flex sm:flex-col sm:justify-center sm:items-center p-8">
            {windowWidth > 769 ? (
              <>
                <div className="items-center flex sm:p-10 sm:pt-4 p-10 justify-between">
                  <img className="w-1/2" src={airjordan} alt="hombres" />
                  <div className="w-2/5 mr-20">
                    <Render type="nike" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="items-center flex justify-between md:flex md:justify-center">
                  <img className="lg:w-1/2 md:w-5/6" src={airjordan} alt="hombres" />
                </div>
                <div className="lg:w-2/5 md:w-2/3 md:flex md:flex-col md:justify-center md:items-center sm:w-3/4 sm:flex sm:justify-center sm:items-center">
                  <Render type="nike" />
                </div>
              </>
            )}
          </div>

          <div className="lg:items-center lg:flex lg:p-10 lg:justify-between md:flex md:flex-col md:justify-center md:items-center">
            {windowWidth > 769 ? (
              <>
                <div className="items-center flex p-10 justify-between">
                  <div className="md:w-2/5 sm:w-3/4">
                    <Render type="puma" />
                  </div>
                  <img className="w-1/2 sm:w-1/2" src={circuit} alt="circuito" />
                </div>
              </>
            ) : (
              <>
                <div className="items-center flex p-10 justify-between md:flex md:justify-center">
                  <img className="md:w-5/6" src={circuit} alt="circuito" />
                </div>
                <div className="lg:w-2/5 md:w-2/3 md:flex md:flex-col md:justify-center md:items-center sm:pl-48 sm:flex sm:justify-center sm:items-center sm:w-3/4">
                  <Render type="puma" />
                </div>
              </>
            )}
          </div>

          <div className="flex">
            <img src={miImagen} alt="shoe1" />
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:m-20 lg:justify-center lg:items-center md:grid-cols-2 md:grid sm:grid sm:grid-col-1">
            {products.map((womanShoe, index) => (
              <div key={index} className="flex justify-center sm:ml-10 sm:mr-10 sm:mt-28 sm:mb-28 sm:gap-2">
                <CardShoes typeShoe={womanShoe} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
