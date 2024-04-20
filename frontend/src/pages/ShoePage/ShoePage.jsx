import { useEffect, useState } from "react";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import { getFavorites, getOrderEntities, getUsers } from "../../api/useCases";
import { postOrderLine } from "../../api/api";
import Swal from "sweetalert2";
import ImgComponent from "../../components/ImgComponent";

const ShoePage = () => {
  const { dataDetails } = useEntitiesContext();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [stateFav, setstateFav] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrderEntities, setOrderEntities] = useState([]);
  const [useLogged, setUseLogged] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const { favorites, addFavorite } = useEntitiesContext();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [product_id, setProduct_id] = useState('');
  const [amount, setAmount] = useState('');
  const [orderEntity_id, setOrderEntity_id] = useState('');
  const [unitSize, setUnitSize] = useState('');
  const [imageColor, setImageColor] = useState('');
  

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
        const data = await getOrderEntities();
        console.log(data);
        setOrderEntities(data);
        console.log("Users:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    // Encuentra el id del usuario logueado
    const foundOrder = allOrderEntities.find(order => order.state === 0 && order.user === `/api/users/${idUser}`);
    if (foundOrder) {
      console.log(foundOrder);
      setOrderEntity_id(foundOrder.id);
    }
  }, [allOrderEntities, idUser]);

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

  const handleCarrito = async () => {
    try {
      const inputValue = document.getElementById('catidad').value; // Obtener el valor del campo de entrada
      console.log(product_id);
      console.log(orderEntity_id);
      const datos = {
        product: `/api/products/${product_id}`,
        amount: parseInt(inputValue),
        unit_price: unitSize,
        orderentity: `/api/order_entities/${orderEntity_id}`,
        unit_size: parseInt(size),
        unit_color: color,
      };

      const response = await postOrderLine(datos);

      if (response) {
        Swal.fire({
          icon: 'success',
          title: '¡Tenemos línea de pedido correctamente!',
          text: `El usuario ${idUser} ha sido actualizado exitosamente.`,
        });
      } else {
        console.error("Error al actualizar usuario");
      }
    } catch (error) {
      console.error("Error en la actualización del usuario:", error);
    }
  }

  const handleSubmit = (event) => {
    const inputValue = event.target.elements.cantidad.value;
    setAmount(inputValue);
  };

  const handleClickColor = (color) => {

    setColor(color);
    setImageColor(color);

  }

  const handleClickSize = (size) => {
    setSize(size);
  }

  useEffect(() => {
    if (dataDetails) {
      setProduct_id(dataDetails.id);
      setUnitSize(dataDetails.price);
    }
  }, [dataDetails]);

  return (
    <div className="grid grid-cols-2">
      {imageColor?<ImgComponent brand={`${dataDetails.brand}`} color={`${imageColor}`}></ImgComponent>
      :      <div className="p-10 flex justify-center items-center"><img className="w-1/2" src={`${apiUrl}${dataDetails.contentUrl}`} alt="imagen" /></div>    }
      
      <div className="mt-10 mr-10 p-10 m-10 rounded-md bg-gray-100">
        <p className="mb-4 text-2xl font-bold">{dataDetails.name}</p>
        <p className="mb-4 text-xl font-bold">{dataDetails.brand}</p>
        <p className="mb-4 text-xl font-bold">{dataDetails.price} €</p>
        <p className="mb-4 text-lg font-bold mt-8">Colores</p>
        <div className="flex ">
          {dataDetails.color.map((col, index) => {
            return <button className="bg-gray-500 text-white border-2 border-black rounded-md m-4 p-2" onClick={() => handleClickColor(col)} key={index}>{col}</button>;
          })}
        </div>
        <p className="mb-4 text-lg font-bold">Selecciona la talla</p>
        <div className="flex">
          {dataDetails.size.map((siz, index) => {
            return <button className="p-2 bg-gray-500 text-white border-2 border-black rounded-md m-4 " onClick={() => handleClickSize(siz)} key={index}>{siz}</button>;
          })}
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className="text-lg font-bold pb-4" htmlFor="cantidad">Cantidad del producto</label>
          <input className="ml-4 w-80 border-2 border-black rounded-md "
            id="catidad"
            type="number"
            placeholder="0"
            style={{ marginBottom: '1rem' }}
          />
        </form>

        <div className="flex flex-col">
          <button onClick={handleCarrito} className="mb-4 text-md font-bold items-center flex mt-4 border w-60 justify-center rounded-md p-2 border-gray-300">Añadir a la cesta <div className="flex items-center justify-between pl-2 pr-2"><ion-icon name="cart-outline"></ion-icon></div></button>

          {stateFav ? (
            <button className="items-center flex mb-4 mt-4 border w-40 justify-center rounded-md p-2 border-gray-300" >
              <div className=" flex items-center w-32 justify-between mr-4 ml-4"><p className=" text-md font-bold ">Favorito</p><ion-icon name="heart"></ion-icon></div>
            </button>
          ) : (
            <button className="items-center flex mb-4 mt-4 border w-40 justify-center rounded-md p-2 border-gray-300" onClick={() => handleLike(dataDetails.id)}>
              <div className=" flex items-center w-32 justify-between mr-4 ml-4"><p className="text-md font-bold">Favorito</p><ion-icon name="heart-outline"></ion-icon></div>
            </button>
          )}

        </div>
        <p className="mb-4 text-lg font-bold">Descripción</p>
        <p className="mb-4 ml-4 text-md ">{dataDetails.description} </p>
      </div>
    </div>
  );
};

export default ShoePage;
