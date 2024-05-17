 {/* {details.size.map((siz, index) => {
              return <button className={`lg:p-2 bg-gray-500 text-white border-2 border-black rounded-md lg:m-4 md:m-4 md:p-3 sm:p-3 sm:m-1 p-2 m-2 ${selectedSize === siz ? 'bg-red-600' : 'bg-gray-500'}`} onClick={() => handleClickSize(siz)} key={index}>{siz}</button>;
            })} */} import { useEffect, useState } from "react";
import { useEntitiesContext } from "../../context/useEntitiesContext";
import { getFavorites, getOrderEntities, getUsers } from "../../api/useCases";
import { postOrderLine } from "../../api/api";
import Swal from "sweetalert2";
import ImgComponent from "../../components/ImgComponent";
import {  useNavigate } from 'react-router-dom';
import catchEntities from "../../components/catchEntities";


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
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColor2, setSelectedColor2] = useState('');
  const [selectedSize, setSelectedsize] = useState('');
  const [details, setdetails] = useState('');

  const navigate= useNavigate();



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

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await catchEntities();
        setOrderEntities(data);
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

  useEffect(() => {
    const storedUser = localStorage.getItem('productDetails');
    if (storedUser) {
      setdetails(JSON.parse(storedUser));
    }
  }, []);
  
  const isFavorite = favorites.includes(details.id);

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

  useEffect(() => {
    // Inicializar selectedColor con el primer color de details.color si existe
    if (details.color && details.color.length > 0) {
      setSelectedColor(details.color[0]);
    }
  }, [details]);
  
  useEffect(() => {
    // Inicializar selectedColor2 con el segundo color de details.color si existe
    if (details.color && details.color.length > 1) {
      setSelectedColor2(details.color[1]);
    }
  }, [details]);
  

  const handleClickColor = (color) => {
    setSelectedColor(color);
    setColor(color);
    setImageColor(color);

  }
  const handleClickColor2 = (color) => {
    setSelectedColor2(color);
    setColor(color);


  }

  const handleClickSize = (size) => {
    setSelectedsize(size);
    setSize(size);
  }

  const handleReturn=()=>{
    navigate("../")
  }

  useEffect(() => {
    if (details) {
      setProduct_id(details.id);
      setUnitSize(details.price);
    }
  }, [details]);

  const ColorButton = ({ color, selectedColor, handleClickColor }) => (
    <button 
      className={`text-white border-2 border-black rounded-md m-4 p-2 ${selectedColor === color ? 'bg-red-600' : 'bg-gray-500'}`} 
      onClick={() => handleClickColor(color)} 
    >
      {color}
    </button>
  );

  const SizeButton = ({ size, selectedSize, handleClickSize }) => (
    <button 
      className={`lg:p-2 bg-gray-500 text-white border-2 border-black rounded-md lg:m-4 md:m-4 md:p-3 sm:p-3 sm:m-1 p-2 m-2 ${selectedSize === size ? 'bg-red-600' : 'bg-gray-500'}`} 
      onClick={() => handleClickSize(size)} 
    >
      {size}
    </button>
  );

  return (
    <div className="lg:grid lg:grid-cols-2 md:grid md:grid-col-1 md:p-8  sm:justify-center sm:flex-col sm:items-center ">
      
      {imageColor?
        <div className="lg:flex lg:justify-center lg:items-center  md:p-6  sm:flex sm:justify-center sm:items-center p-20 justify-center md:m-24 lg:m-2  ">
          <ImgComponent className="sm:flex" brand={`${details.brand}`} color={`${imageColor}`} name={`${details.name}`}></ImgComponent>
        </div>
      :      
      <div className="lg:p-2 lg:flex lg:justify-center lg:items-center md:flex md:justify-center  sm:flex sm:justify-center sm:items-center flex p-10 justify-center"><img className="lg:w-3/5 md:w-1/2 sm:w-1/2" src={`${apiUrl}${details.contentUrl}`} alt="imagen" /></div>    }
      <div className="md:flex md:justify-center sm:flex sm:justify-center p-10">
        <div className="lg:mt-10 lg:mr-10 lg:p-10 lg:m-10 md:m-4 md:p-6 rounded-md md:mt-8 bg-gray-100 sm:w-3/4 sm:p-8 p-4">
          <p className="mb-4 text-2xl font-bold">{details.name}</p>
          <p className="mb-4 text-xl font-bold">{details.brand}</p>
          <p className="mb-4 text-xl font-bold">{details.price} €</p>
          <p className="mb-4 text-lg font-bold mt-8">Colores</p>
          <div className="flex md:flex-wrap sm:m-1">
            
          <div>
              {details.color && details.color.length >= 2 ? (
                // Renderiza botones para cada color en details.color
                details.color.map((col, index) => (
                  <ColorButton
                    color={col}
                    selectedColor={selectedColor}
                    handleClickColor={handleClickColor}
                    key={index}
                  />
                ))
              ) : details.color && details.color.length === 1 ? (
                // Renderiza un solo botón si solo hay un color disponible
                <ColorButton
                  color={details.color[0]}
                  selectedColor={selectedColor2}
                  handleClickColor={()=>handleClickColor2(details.color[0])}
                  key={0}
                />
              ) : null}
            </div>
          </div>
          <p className="mb-4 text-lg font-bold">Selecciona la talla</p>
          <div className="flex md:flex-wrap sm:flex-wrap flex-wrap ">
          <div className="flex md:flex-wrap sm:flex-wrap flex-wrap ">
            {details.size && details.size.map((siz, index) => (
              <SizeButton
                size={siz}
                selectedSize={selectedSize}
                handleClickSize={handleClickSize}
                key={index}
              />
            ))}
</div>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className="text-lg font-bold pb-4" htmlFor="cantidad">Cantidad del producto</label>
            <input className="ml-4 w-60 border-2 border-black rounded-md "
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
              <button className="items-center flex mb-4 mt-4 border w-40 justify-center rounded-md p-2 border-gray-300" onClick={() => handleLike(details.id)}>
                <div className=" flex items-center w-32 justify-between mr-4 ml-4"><p className="text-md font-bold">Favorito</p><ion-icon name="heart-outline"></ion-icon></div>
              </button>
            )}

          </div>
          <p className="mb-4 text-lg font-bold">Descripción</p>
          <p className="mb-4 ml-4 text-md ">{details.description} </p>
        </div>
      </div>
      <button className='border-2 border-black rounded-lg m-4 font-medium p-2 w-40 mt-10' onClick={handleReturn}>Volver</button>

    </div>
  );
};

export default ShoePage;