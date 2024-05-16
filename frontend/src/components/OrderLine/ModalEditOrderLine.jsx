import  { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { updateOrderLine } from '../../api/api';

const ModalEditOrderLine = ({ order, open, closeModal, product2,update }) => {
    
    const [unitColor, setColor] = useState('');
    const [unit_color, setunit_color] = useState('');
    const [unitSize, setUnitSize] = useState('');
    const [unit_size, setunit_size] = useState('');
    const [orderentity, setorderentity] = useState('');
    const [amount, setAmount] = useState(null); 
    const [unitPrice, setPrice] = useState(null); 
    const [unit_price, setunit_price] = useState(null); 
    const [product, setProduct] = useState(''); 
    


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

            update();
        
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
        <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
            <ion-icon style={{color:"white"}} size="large" name="close"></ion-icon>
          </div>                    
            <div className={`modal ${open ? 'open' : 'closed'}  bg-gray-200 m-4 rounded-md p-6 `}>
                <div className="modal-content p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-80">
                        
                        <label className='font-bold' htmlFor="color">Color:</label>
                        <div className="flex flex-wrap ">
                          {product2.color.map((col, index) => {
                            return <button className="bg-black rounded-md text-white m-4 p-2" onClick={() => handleClickColor(col)} key={index}>{col}</button>;
                          })}
                        </div>
                     
                        <label className='font-bold ' htmlFor="size">Size:</label>
                        <div className="flex flex-wrap">
                          {product2.size.map((siz, index) => {
                            return <button className="p-2 rounded-md border-2  bg-red-200 m-2" onClick={() => handleClickSize(siz)} key={index}>{siz}</button>;
                          })}
                        </div>
                        {/* <input type="text" id="size" value={unitSize} onChange={(e) => { setUnitSize(e.target.value); setunit_size(e.target.value); }} /> */}
                        
                        <label className='font-bold' htmlFor="amount">Amount:</label>
                        <input className='rounded-md' type="number" id="amount" value={amount || ''} onChange={(e) => setAmount(parseInt(e.target.value, 10))} />
                        
                        <button className="bg-white border-2 border-black rounded-md mt-4 mb-4 p-2" type="submit">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditOrderLine;


/* import { useEntitiesContext } from "../context/useEntitiesContext";
import {  useNavigate } from 'react-router-dom';
import { LazyLoadImage} from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';


const CardShoes = ({ typeShoe }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate= useNavigate();
    const {updateDetails}= useEntitiesContext();

    

  
    const handleFlip = () => {
        updateDetails(typeShoe);
        localStorage.setItem(
            "detailsProduct",
            JSON.stringify({ product: typeShoe })
          );
        navigate("/shoe");
    }
    
    

    return (
        <div 
    className="lg:flex lg:justify-center lg:items-center lg:flex-col lg:w-1/2 lg:m-4  border-none rounded-md cursor-pointer md:justify-center md:flex flex items-center flex-col"
    style={{ width: '300px', height: '550px' }} // Aquí estableces el ancho y alto fijos
    onClick={handleFlip}
>
    <div 
        className="lg:flex lg:justify-center lg:items-center lg:flex-col md:flex md:justify-center bg-slate-100 lg:w-80 lg:m-4 lg:p-4 border-none rounded-md md:w-3/4 md:p-4 sm:m-8 p-8 flex items-center"  
        style={{ 
            backgroundImage: 'url(/src/assets/Texturelabs_Grunge_193M.jpg)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            width: '100%', // Ancho al 100%
            height: '100%', // Alto al 100%
        }}
    >
        <LazyLoadImage effect="blur"  src={`${apiUrl}${typeShoe.contentUrl}`} alt="productos" className=" md:w-64 lg:max-w-80"/>
    </div>
    <div className=" flex justify-between lg:w-80 md:w-2/3 sm:flex sm:justify-between sm:w-80 sm:m-2 w-80">
        <div>
            <p className="font-bold">{typeShoe.name}</p>
        </div>
        <div>
            <p className="font-bold">{typeShoe.price} €</p>
        </div>
    </div>
</div>

    );
}

export default CardShoes;
*/