import { useEffect, useState } from "react";
import { getOrderEntities, getProducts, getUsers } from "../api/useCases";
import { postOrderEntity } from "../api/api";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/useAuthContext";
import CardShoes from "../components/CardShoes";
import ProductsSearch from "../components/ProductsSearch";
import { useEntitiesContext } from '../context/useEntitiesContext';
import miImagen from '../assets/home/zapa2.webp';
import airjordan from '../assets/home/airjordan.webp';
import circuit from '../assets/home/circuit-last.webp';
import ObjectThreeD from "../components/ThreeD/ObjectThreeD";
import Render from "../components/Render";
import Loaderanimated from "../../src/components/Loaderanimated";


const Home = () => {
  const [allUsers, setallUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderUser, setorderUser] = useState(null);
  const [useLogged, setUseLogged] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const {setUserLogged,setUsers2 } = useAuthContext();
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    const fetchApi = async () => {
      try {
        const usersData = await getUsers();
        setallUsers(usersData);
        setUsers2(usersData);
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
    const fetchApi = async () => {

      try {
        setLoading(true);
        const products=await getProducts();
          setProducts(products.filter(product => product.new === 1));
      }catch(err) {
          console.log("Error:", err);
      }
      setLoading(false);

    };
    fetchApi();

  }, [])



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
          console.log(foundUser);
          setIdUser(parseInt(foundUser.id, 10));
          setUserLogged(parseInt(foundUser.id, 10));
          return userId === foundUser?.id;
        });
  
        setorderUser(filteredOrder);
        console.log("Orders:", filteredOrder);
  
        // Crear pedido aquí si orderUser no está vacío
        if (filteredOrder.length === 0 && idUser !== null) {
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
  }, [allUsers, useLogged, idUser]);
  
  return (
    <div className="">
        {/* <ObjectThreeD  carpeta="shoe1" file="sketchfab_shoe.fbx"></ObjectThreeD> */}
      {/* <div className="mt-10 flex justify-between"> */}
        {/* <ObjectThreeD  carpeta="shoe1" file="sketchfab_shoe.fbx"></ObjectThreeD> */}
        {/* <img src={airjordan} alt="zapatos" />
      </div> */}
      <div className="items-center flex p-10 " >
        <img className="w-1/2" src={airjordan} alt="hombres" />
        <div className="w-2/5">
          <Render type="nike"></Render>
        </div>
      </div>

      <div className="items-center flex p-10 justify-between " >
        <div className="w-2/5">
          <Render type="puma" ></Render>
        </div>
        <img className="w-1/2"  src={circuit} alt="circuito" />
      </div>
        {/* <ObjectThreeD  carpeta="shoe2" file="brown_sneakers.fbx"></ObjectThreeD> */}
      <div className="flex">
        <img src={miImagen} alt="shoe1" />
      </div>
        {loading ? (
          <div className="flex justify-center items-center mt-60">
              <Loaderanimated />
          </div>
      ):(
        <div className="grid grid-cols-2 gap-4 m-20  justify-center items-center">
          {products.map((womanShoe, index) => (
            <div key={index} className="flex justify-center" >
              <CardShoes typeShoe={womanShoe} />
            </div>
          ))}
          </div>
        )}
      
    </div>
  );
};

export default Home;
