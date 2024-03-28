
import { useEffect, useState } from "react";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import { getFavorites, getUsers } from "../../api/useCases";

const ShoePage = () => {
  // Obtener la ubicación actual, incluido el estado pasado desde el enlace
  // Extraer los datos del zapato del estado pasado

  const {dataDetails}  = useEntitiesContext();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [stateFav, setstateFav] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [useLogged, setUseLogged] = useState(false);

  const [idUser, setIdUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useEntitiesContext(); // Obtiene el estado y las funciones del contexto


  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getUsers();
          setAllUsers(data);
          console.log("Users:", data);
        } catch (error) {
            console.log("Error:", error);
        }
    };
    fetchApi();
  }, []);


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getFavorites();
        setFavoritos(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    // Encuentra el id del usuario logueado
    const foundUser = allUsers.find(user => user.username === useLogged.login);
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


  const isFavorite = favorites.includes(dataDetails.id);

  const handleLike = (idShoe) => {
      if (!isFavorite) {
          // Verificar si idUser es válido
          if (idUser) {
              addFavorite(idShoe, idUser); // Agregar a favoritos
          } else {
              console.warn("El ID de usuario no está disponible aún.");
          }
          setstateFav(true);
      }
  }

  const handleNotLike = (idShoe) => {
      console.log(idShoe)
      const favoriteIndex = favoritos.findIndex(favorite => favorite.product === `/api/products/${idShoe}`);
      console.log(favoritos)
      console.log(favoriteIndex);
      if (favoriteIndex !== -1) {
          const favoritoId = favoritos[favoriteIndex].id;
          removeFavorite(favoritoId);
      }
      setstateFav(false);
  }

  console.log(dataDetails);
  return (
    <div className="grid grid-cols-2 m-10">
      <div className="p-10 flex justify-center items-center"><img className="w-3/5" src={`${apiUrl}${dataDetails.contentUrl}`} alt="imagen" /></div>
      <div className="mt-20 mr-10">
        <p className="mb-4 text-2xl font-bold">{dataDetails.name}</p>
        <p className="mb-4 text-lg font-bold">{dataDetails.brand}</p>
        <p className="mb-4 text-lg font-bold">{dataDetails.price} €</p>
        <p className="mb-4 text-lg font-bold">Colores</p>
        <div className="flex ">
          {dataDetails.color.map((col, index) => {
            return <p className="bg-red-100 m-4 p-2" key={index}>{col}</p>;
          })}
        </div>
        <p className="mb-4 text-lg font-bold">Selecciona la talla</p>
        <div className="flex">
          {dataDetails.size.map((siz, index) => {
            return <p className="p-4" key={index}>{siz}</p>;
          })}
        </div>
        <div className="flex flex-col">

          <button className="mb-4 text-lg font-bold items-center flex mt-4 border w-60 justify-center rounded-md p-2 border-gray-300">Añadir a la cesta <div className="flex items-center justify-between pl-2 pr-2"><ion-icon name="cart-outline"></ion-icon></div></button>

          {stateFav ? (
            <button className="items-center flex mb-4 mt-4 border w-40 justify-center rounded-md p-2 border-gray-300" onClick={() => handleNotLike(dataDetails.id)}>
              <div className=" flex items-center w-32 justify-between mr-4 ml-4"><p className=" text-lg font-bold ">Favorito</p><ion-icon name="heart"></ion-icon></div>
            </button>
            ) : (
            <button className="items-center flex mb-4 mt-4 border w-40 justify-center rounded-md p-2 border-gray-300" onClick={() => handleLike(dataDetails.id)}>
              <div className=" flex items-center w-32 justify-between mr-4 ml-4"><p className="text-lg font-bold">Favorito</p><ion-icon name="heart-outline"></ion-icon></div>
            </button>
          )}    

        </div>
        <p className="mb-4 text-lg font-bold">Descripción</p>
        <p className="mb-4 text-lg ">{dataDetails.description} </p>
       

      </div>
    </div>
  );
};

export default ShoePage;
