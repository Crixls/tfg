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


const Home = () => {
  const [allUsers, setallUsers] = useState([]);
  const [products, setProducts] = useState([]);
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
    const fetchApi = async () => {

      try {
        const products=await getProducts();
          setProducts(products.filter(product => product.new === 1));
      }catch(err) {
          console.log("Error:", err);
      }
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
    <div className="">
      {search ? <ProductsSearch></ProductsSearch>:""}
        {/* <ObjectThreeD  carpeta="shoe1" file="sketchfab_shoe.fbx"></ObjectThreeD> */}
      {/* <div className="mt-10 flex justify-between"> */}
        {/* <ObjectThreeD  carpeta="shoe1" file="sketchfab_shoe.fbx"></ObjectThreeD> */}
        {/* <img src={airjordan} alt="zapatos" />
      </div> */}
      <div style={{ maxWidth: '50%', padding:'20px',marginTop:'40px', display:"flex" }}>
        <img src={airjordan} alt="hombres" />
        <Render></Render>

      </div>

      <div style={{ maxWidth: '50%', padding:'20px',marginTop:'40px', display:"flex", marginBottom:"20px" }}>
          <Render ></Render>
            <img  src={circuit} alt="circuito" />
      </div>
        {/* <ObjectThreeD  carpeta="shoe2" file="brown_sneakers.fbx"></ObjectThreeD> */}
      <div className="flex">
        <img src={miImagen} alt="shoe1" />
      </div>
      <div className="grid grid-cols-2 gap-4 m-20">
        {products.map((womanShoe, index) => (
          <div key={index} className="flex justify-center" >
            <CardShoes typeShoe={womanShoe} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Home;
