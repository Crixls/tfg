import React, { useEffect, useState } from "react";
import { getOneProduct, getOrderEntities, getOrderLines } from "../../api/useCases";
import { useAuthContext } from "../../context/useAuthContext";
import { deleteOrderLine } from "../../api/api";
import ModalEditOrderLine from "../../components/OrderLine/ModalEditOrderLine";
import { useNavigate } from "react-router-dom";
import Loaderanimated from "../../components/Loaderanimated";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import paypalImage from "../../assets/paypal.png";
import StripeContainer from "../../components/Payment/StripeContainer";
import catchEntities from "../../components/catchEntities";

const CartPage = () => {
  const [orderLines, setOrderLines] = useState([]);
  const [orderEntity, setOrderEntity] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { userLogged } = useAuthContext();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [userId2, setUserId2] = useState("");
  const navigate = useNavigate();

  const handleCloseModal2 = () => {
    setOpen(false);
  };

  const handlePay = () => {
    navigate("/payment");
  }

  const handleEdit = (order, product) => {
    setSelectOrder(order);
    setSelectProduct(product);
    
    setOpen(true);
  }

  useEffect(() => {
    const intervalId = setInterval(fetchOrderLines, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId); // Limpia el temporizador al desmontar el componente
}, []);


  const handleDelete = async (id) => {
    await deleteOrderLine(id);
    // Recargar las líneas de pedido después de eliminar una
    fetchOrderLines();
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId2(userId);
  }, []);

  useEffect(() => {
    const fetchOrderEntities = async () => {
      try {
        setLoading(true);

        const data = await catchEntities();
        const filteredOrder = data.filter(order => {
          const userId = parseInt(order.user.split('/').pop(), 10);
          const userState = order.state;
          return userId === parseInt(userId2, 10) && userState === 0;
        });
        setUser(filteredOrder[0].user);
        setOrderEntity(filteredOrder);
        setLoading(false);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchOrderEntities();
  }, [userId2]);

  useEffect(() => {
    // Establece la fecha actual como el valor inicial de date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    setDate(formattedDate);
  }, []);
  

  const handleUpdate =()=>{
    fetchOrderLines();

  }


    const fetchOrderLines = async () => {
      try {
        if (orderEntity.length > 0) {
          const data = await getOrderLines();
          const filteredOrderLine = filterOrderLines(data, orderEntity[0]?.id);
          const totalPrice = calculateTotalPrice(filteredOrderLine);

          setTotal(totalPrice);
          setOrderLines(filteredOrderLine);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchOrderLines();


  const filterOrderLines = (data, entityId) => {
    return data.filter(order => {
      const orderEId = parseInt(order.orderentity.split('/').pop(), 10);
      return orderEId === parseInt(entityId, 10);
    });
  };

  const calculateTotalPrice = (orderLines) => {
    return orderLines.reduce((acc, order) => {
      const price = parseInt(order.unitPrice, 10);
      const amount = parseInt(order.amount, 10);
      return acc + price * amount;
    }, 0);
  };

  const handleShowItem = () => {
    setShowItem(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = orderLines.map(async order => {
          const productId = order.product;
          const productData = await getOneProduct(productId);
          return productData;
        });
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProducts();
  }, [orderLines]);

  return (
    <>
      <div className="flex justify-center">
        {open && <ModalEditOrderLine update={handleUpdate} product2={selectProduct} open={open} closeModal={handleCloseModal2} order={selectOrder} />}
      </div>
      {showItem ? <StripeContainer date={date} user={user} order={orderEntity[0]?.id} total={total}></StripeContainer> : ""}
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <Loaderanimated />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-2 ">
          <div className="m-10">
            <div className="p-4 mt-16" style={{ backgroundImage: 'url(/src/assets/favorite/favoritetext.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <p className="text-xl font-bold text-white">CESTA DE COMPRAS - {orderLines.length}</p>
            </div>
            {orderLines.map((order, index) => (
              <div key={index} className="m-10">
                <div className="grid grid-cols-2 border p-6 rounded-md">
                  <div>
                    <LazyLoadImage effect="blur" src={`${apiUrl}${products[index]?.contentUrl}`} alt={products[index]?.name} />
                  </div>
                  <div className="ml-8">
                    <div className="flex justify-between">
                      <p className="font-bold mb-4">{products[index]?.name}</p>
                      <p className="font-bold">{order.unitPrice} €</p>
                    </div>
                    <p>Color: {order.unitColor}</p>
                    <p>Talla: {order.unitSize}</p>
                    <p>Cantidad: {order.amount}</p>
                    <div className="flex justify-end mt-4">
                      <button onClick={() => handleEdit(order, products[index])} className="mr-2"><ion-icon name="create-outline"></ion-icon></button>
                      <button onClick={() => handleDelete(order.id)}><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 m-10 mt-24 p-10  flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/src/assets/tex1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-10" style={{ backgroundColor: "rgba(128, 128, 128, 0.8)" }}>
              <p className="text-lg font-bold text-white ">Total: {total} €</p>
              <div className="flex flex-col items-center mt-6">
                <button className="flex justify-center items-center bg-black rounded-md p-4 mt-4 w-80" onClick={handleShowItem}>
                  <ion-icon style={{ color: "white" }} name="card-outline"></ion-icon>
                  <p className="ml-4 font-bold text-white" >
                    PAGAR
                  </p>
                </button>               
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;