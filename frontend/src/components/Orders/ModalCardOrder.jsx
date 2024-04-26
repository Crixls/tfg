import { useEffect } from "react";
import { getOrderLines, getProducts } from "../../api/useCases";
import { useState } from "react";

const ModalCardOrder = ({order,closeModal,open}) => {
    console.log(order)

    const [filterOrderLines, setfilterOrderLines] = useState([])
    const [filteredProduct2, setfilterProduct2] = useState([])
    const [productOrder, setproductOrder] = useState([]);

    
    useEffect(() => {
        const fetchOrderEntities = async () => {
          try {
      
            const data = await getOrderLines();
            console.log(data);
            const filteredOrderLines = data.filter(orderLine => {
               const orderId = parseInt(orderLine.orderentity.split('/').pop(), 10);
              
               console.log(orderId);
               // Comprobar que el ID del usuario sea igual al del usuario loggeado y que el estado sea 0
               return orderId === parseInt(order.id, 10);
            });
      
            console.log(filteredOrderLines);
            setfilterOrderLines(filteredOrderLines);
            // setLoading(false);
      
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchOrderEntities();
      }, []);

      
      
      
      useEffect(() => {
          filterOrderLines.map((orderLine)=>{
              setproductOrder(orderLine);
            })
        }, []);
        console.log(productOrder);
        
    useEffect(() => {
        const fetchOrderEntities = async () => {
          try {
      
            const data = await getProducts();
            console.log(data);
            const filteredProduct = data.filter(product => {
               const productId = parseInt(product.id);
               console.log(productId);
               console.log(productOrder);
               // Comprobar que el ID del usuario sea igual al del usuario loggeado y que el estado sea 0
               return productId === parseInt(productOrder, 10);
            });
      
            setfilterProduct2(filteredProduct);
            // setLoading(false);
      
          } catch (error) {
            console.log("Error:", error);
          }
        };
        fetchOrderEntities();
      }, []);

    
      console.log(filteredProduct2);


  return (
    <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
            <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
        </div>     
        <div className={`modal ${open ? 'open' : 'closed'}  bg-gray-400 rounded-md w-1/4`}>
            <div className="modal-content">
                {filterOrderLines.map((product, index) => (
                    <>
                        <div className="flex justify-center items-center" key={index}>
                            <div className="p-20 ">
                                <p className="text-white p-1">{`Cantidad: ${product.amount}`}</p>
                                <p className="text-white p-1">{`Color: ${product.unitColor}`}</p>
                                <p className="text-white p-1">{`Precio: ${product.unitPrice}`}</p>
                                <p className="text-white p-1">{`Tamaño: ${product.unitSize}`}</p>
                            </div>
                        </div>
                    </>
                ))}
                <div className="flex justify-center items-center p-10">
                    <p className="text-2xl font-bold text-white">{`Total: ${order.total}€`}</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ModalCardOrder
