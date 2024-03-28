import { useEffect, useState } from "react";
import { getUsers } from "../api/useCases";
import { postOrderEntity } from "../api/api";
import Swal from "sweetalert2";

const Home = () => {
  const [allUsers, setallUsers] = useState([]);
  const [useLogged, setUseLogged] = useState(false);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getUsers();
        setallUsers(data);
        console.log("Users:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    // Encuentra el id del usuario logueado
    const foundUser = allUsers.find((user) => user.username === useLogged.login);
    if (foundUser) {
      setIdUser(foundUser.id);
    }
  }, [allUsers, useLogged]);

  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUseLogged(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleSubmit = async () => {
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
            title: '¡tenemos carrito correctamente!',
            text: `El usuario ${idUser} ha sido actualizado exitosamente.`,
          });
        } else {
          console.error("Error al actualizar usuario");
        }
      } catch (error) {
        console.error("Error en la actualización del usuario:", error);
      }
    };

    if (idUser !== null) {
      handleSubmit(); // Llama a la función handleSubmit cuando idUser no sea null
    }
  }, [idUser]);

  return (
    <>
      {/* No necesitas ningún botón */}
    </>
  );
};

export default Home;
