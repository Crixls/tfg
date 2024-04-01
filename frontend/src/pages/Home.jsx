import { useEffect, useState } from "react";
import { getOrderEntities, getUsers } from "../api/useCases";
import { postOrderEntity } from "../api/api";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/useAuthContext";
import CardShoes from "../components/CardShoes";
import ProductsSearch from "../components/ProductsSearch";
import { useEntitiesContext } from '../context/useEntitiesContext';


const Home = () => {
  const [allUsers, setallUsers] = useState([]);
  const [orderUser, setorderUser] = useState(null);
  const [useLogged, setUseLogged] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const {setUserLogged } = useAuthContext();

  const {search}= useEntitiesContext();


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const usersData = await getUsers();
        setallUsers(usersData);
        console.log("Users:", usersData);

        const storedUser = localStorage.getItem('UserToken');
        if (storedUser) {
          setUseLogged(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchApi();
  }, []);



  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUseLogged(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getOrderEntities();
        const filteredOrder = data.filter(order => {
          const userId = parseInt(order.user.split('/').pop(), 10);
          const foundUser = allUsers.find(user => user.username === useLogged.login);
          setIdUser(parseInt(foundUser.id,10));
          setUserLogged(parseInt(foundUser.id,10));
          return userId === foundUser?.id;
        });

        setorderUser(filteredOrder);
        console.log("Orders:", filteredOrder);
        

        // Crear pedido aquí si orderUser no está vacío
        if (filteredOrder.length === 0 ){
          console.log(idUser);
          const orderEntityData = {
            user: `/api/users/${idUser}`, // Se asume que foundUser está definido aquí
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
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchApi();
  }, [allUsers, useLogged]);
  

  return (
    <>
      {search ? <ProductsSearch></ProductsSearch>:""}
    </>
  );
};

export default Home;
