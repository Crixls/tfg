import  { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { updateOrderLine } from '../../api/api';

const ModalEditOrderLine = ({ order, open, closeModal, product2 }) => {
    
    const [unitColor, setColor] = useState('');
    const [unit_color, setunit_color] = useState('');
    const [unitSize, setUnitSize] = useState('');
    const [unit_size, setunit_size] = useState('');
    const [orderentity, setorderentity] = useState('');
    const [amount, setAmount] = useState(null); 
    const [unitPrice, setPrice] = useState(null); 
    const [unit_price, setunit_price] = useState(null); 
    const [product, setProduct] = useState(''); 

      console.log(product2);
    


    useEffect(() => {
        if (order) {
          console.log(order)
          setColor(order.unitColor || '');
          setunit_color(order.unitColor || '');
          setUnitSize(order.unitSize || '');
          setunit_size(order.unitSize || '');
          setPrice(order.unitPrice || null);
          setunit_price(order.unitPrice || null);
          setAmount(order.amount || null);
          setorderentity(order.orderentity || '');
          setProduct(order.product || '');
        }
    }, [order]);

    const handleClickColor = (color) => {
      setColor(color);
      setunit_color(color);
    }

    const handleClickSize = (size) => {
      setUnitSize(size);
      setunit_size(size);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const parsedAmount = parseInt(amount, 10);
        console.log(parsedAmount); // Log the parsed price to check its type

        console.log(unitPrice);
        const parsedPrice = parseFloat(unitPrice);
        console.log(parsedPrice); // Log the parsed price to check its type
    
        const parsedPrice2 = parseFloat(unit_price);
        console.log(parsedPrice2); // Log the parsed price to check its type
    
        const parsedUnit = parseInt(unit_size);
        console.log(parsedPrice); // Log the parsed price to check its type
    
        const parsedUnit2 = parseInt(unitSize);
        console.log(parsedPrice2); // Log the parsed price to check its type
    
    
        try {
            const updateOrderData = {
              unitColor,
              unit_color,
              unitSize:parsedUnit2,
              unit_size:parsedUnit,
              unitPrice:parsedPrice,
              unit_price:parsedPrice2,
              product,
              orderentity,
              amount: parsedAmount, // Use parsedPrice instead of price
            };

            
      
            console.log(updateOrderData);
        
            const response = await updateOrderLine(order.id, updateOrderData);
        
            if (response) {
                Swal.fire({
                  icon: 'success',
                  title: 'Linea de pedido actualizada correctamente!',
                  text: `La linea de pedido ha sido actualizada exitosamente.`,
                });
              } else {
                console.error("Error en la respuesta");
              }
            } catch (error) {
              console.error("Error en la actualización del producto:", error);
            } finally {
              closeModal();
            }
    };

    return (
        <div>
            <div className={`modal ${open ? 'open' : 'closed'}  bg-green-200 `}>
                <div className="modal-content">
                    <span className="close " onClick={closeModal}>&times;</span>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-80">
                        
                        <label htmlFor="color">Color:</label>
                        <div className="flex ">
                          {product2.color.map((col, index) => {
                            return <p className="bg-red-100 m-4 p-2" onClick={() => handleClickColor(col)} key={index}>{col}</p>;
                          })}
                        </div>

                        {/* <label htmlFor="color">Color:</label>
                        <input type="text" id="color" value={unitColor} onChange={(e) => {setunit_color(e.target.value); setColor(e.target.value)} }/>
                         */}
                        <label htmlFor="size">Size:</label>
                        <div className="flex">
                          {product2.size.map((siz, index) => {
                            return <p className="p-4" onClick={() => handleClickSize(siz)} key={index}>{siz}</p>;
                          })}
                        </div>
                        {/* <input type="text" id="size" value={unitSize} onChange={(e) => { setUnitSize(e.target.value); setunit_size(e.target.value); }} /> */}
                        
                        <label htmlFor="amount">Amount:</label>
                        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))} />
                        
                        <button className="bg-gray-300 mt-4 mb-4 p-2" type="submit">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditOrderLine;


/*amount
: 
78
id
: 
34
orderentity
: 
"/api/order_entities/16"
product
: 
"/api/products/28"
unitColor
: 
"verde"
unitPrice
: 
1243
unitSize
: 
33
unit_color
: 
"verde"
unit_price
: 
1243
unit_size
: 
33 */