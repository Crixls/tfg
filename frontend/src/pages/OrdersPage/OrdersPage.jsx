import React, { useEffect, useState } from 'react';
import { getOrderEntities } from '../../api/useCases';
import { useAuthContext } from '../../context/useAuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardOrders from '../../components/Orders/CardOrders';
import Loaderanimated from "../../components/Loaderanimated";



const OrdersPage = () => {
    const [orderEntity, setOrderEntity] = useState(null);
    const { userLogged } = useAuthContext();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchOrderEntities = async () => {
          try {
      
            setLoading(true);

            const data = await getOrderEntities();
            console.log(data);
            console.log(userLogged);
            const filteredOrder = data.filter(order => {
              const userId = parseInt(order.user.split('/').pop(), 10);
              const userState = order.state; // Acceder al estado del usuario
              console.log(order.user);
              // Comprobar que el ID del usuario sea igual al del usuario loggeado y que el estado sea 0
              return userId === parseInt(userLogged, 10) && userState === 1;
            });
            setLoading(false);

            console.log(filteredOrder);
            setOrderEntity(filteredOrder);
            // setLoading(false);
      
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchOrderEntities();
      }, [userLogged]);

      console.log(orderEntity)
      
    return (
        <>
            <div className="p-4 mt-10 " style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}> 
                <p className="text-white flex w-full text-2xl font-bold">Pedidos del usuario</p>
            </div>
            {loading ? (
                <div className="flex justify-center items-center mt-60">
                <Loaderanimated />
              </div>
            ):(
              <div>
                {orderEntity !== null && orderEntity.map((order, index) => (
                  <CardOrders  key={index}  order={order}></CardOrders>
                ))}
              </div>
            )}
        </>
    );
};

export default OrdersPage;
