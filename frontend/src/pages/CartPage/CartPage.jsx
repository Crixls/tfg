import React, { useEffect, useState } from "react";
import { getOneProduct, getOrderEntities, getOrderLines } from "../../api/useCases";
import { useAuthContext } from "../../context/useAuthContext";
import { deleteOrderLine } from "../../api/api";
import ModalEditOrderLine from "../../components/OrderLine/ModalEditOrderLine";
import { useNavigate } from "react-router-dom";



import paypalImage from "../../assets/paypal.png";

const CartPage = () => {
  const [orderLines, setOrderLines] = useState([]);
  const [orderEntity, setOrderEntity] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { userLogged } = useAuthContext();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectOrder, setselectOrder] = useState(null);
  const [selectProduct, setselectProduct] = useState(null);

  const navigate= useNavigate();




  const handleCloseModal2 = () => {
    setOpen2(false);
  };

  const handlePay = () => {
    navigate("/payment");
  }


  const handleEdit = (order,product)=>{
    setselectOrder(order);
    setselectProduct(product);
    setOpen(true);
  }
  const handleDelete = (id)=>{
    deleteOrderLine(id);
  }

  useEffect(() => {
    const fetchOrderEntities = async () => {
      try {
        const data = await getOrderEntities();
        const filteredOrder = data.filter(order => {
          const userId = parseInt(order.user.split('/').pop(), 10);
        
          return userId === parseInt(userLogged, 10);
        });
        setOrderEntity(filteredOrder);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchOrderEntities();
  }, [userLogged]);

  useEffect(() => {
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
  }, [orderEntity, orderEntity.length]); // Añadir orderEntity.length como dependencia
  
  // Función para filtrar las líneas de pedido
  const filterOrderLines = (data, entityId) => {
    return data.filter(order => {
      const orderEId = parseInt(order.orderentity.split('/').pop(), 10);
      return orderEId === parseInt(entityId, 10);
    });
  };
  
  // Función para calcular el precio total
  const calculateTotalPrice = (orderLines) => {
    return orderLines.reduce((acc, order) => {
      const price = parseInt(order.unitPrice, 10);
      const amount = parseInt(order.amount, 10);
      return acc + price * amount;
    }, 0);
  };
  

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
        {open && <ModalEditOrderLine product2={selectProduct}  open={open} closeModal={handleCloseModal2} order={selectOrder}/>}
    </div>
    <div className="grid grid-cols-2">
      <div className="m-10">
        <p className="text-lg font-bold">CESTA DE COMPRAS - {orderLines.length}</p>
        {orderLines.map((order, index) => (
          <div key={index} className="m-10">
            <div className="grid grid-cols-2 border p-6 rounded-md">
              <div>
                <img src={`${apiUrl}${products[index]?.contentUrl}`} alt={products[index]?.name} />
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
                  <button onClick={()=>handleEdit(order,products[index])} className="mr-2"><ion-icon name="create-outline"></ion-icon></button>
                  <button  onClick={()=>handleDelete(order.id)}><ion-icon name="trash-outline"></ion-icon></button>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      <div className="bg-gray-100 m-10 mt-28 p-10 h-1/2">
        <p className="text-lg font-bold">Total: {total}</p>
        <div className="flex flex-col items-center mt-6">
          <button className="flex justify-center items-center bg-purple-300 border rounded-md p-4 mt-4 w-80" onClick={handlePay}>
            <ion-icon name="card-outline"></ion-icon> 
            <p className="ml-4 font-bold">
              PAGAR
            </p>
          </button>
          <a className="flex justify-center items-center bg-green-200 border rounded-md p-4 mt-4 w-80" href="https://www.paypal.com/checkoutnow?cmd=_express-checkout&token=EC-6G927306LJ3954746&useraction=continue">
            <img className="w-24" src={paypalImage} alt="paypal" />
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
