//Linea de pedido

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { updateOrderLine } from '../../api/api';

const ModalEditOrderLine = ({ order, open, closeModal, product2, update }) => {
  const [unitColor, setColor] = useState('');
  const [unit_color, setunit_color] = useState('');
  const [unitSize, setUnitSize] = useState('');
  const [unit_size, setunit_size] = useState('');
  const [orderentity, setorderentity] = useState('');
  const [amount, setAmount] = useState(null);
  const [unitPrice, setPrice] = useState(null);
  const [unit_price, setunit_price] = useState(null);
  const [product, setProduct] = useState('');
  const [colorPut, setcolorPut] = useState('');
  const [sizePut, setsizePut] = useState('');

  useEffect(() => {
    if (order) {
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
    setcolorPut(color);
    setunit_color(color);
  };

  const handleClickSize = (size) => {
    setUnitSize(size);
    setsizePut(size);
    setunit_size(size);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount, 10);
    const parsedPrice = parseFloat(unitPrice);
    const parsedPrice2 = parseFloat(unit_price);
    const parsedUnit = parseInt(unit_size);
    const parsedUnit2 = parseInt(unitSize);

    try {
      const updateOrderData = {
        unitColor,
        unit_color,
        unitSize: parsedUnit2,
        unit_size: parsedUnit,
        unitPrice: parsedPrice,
        unit_price: parsedPrice2,
        product,
        orderentity,
        amount: parsedAmount,
      };

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
    }
  };

  return (
    <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="cursor-pointer absolute top-4 right-4" onClick={closeModal}>
        <ion-icon style={{ color: "white" }} size="large" name="close"></ion-icon>
      </div>
      <div className={`modal ${open ? 'open' : 'closed'} bg-gray-200 m-4 rounded-md p-6`}>
        <div className="modal-content p-4">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-80">
            <label className='font-bold' htmlFor="color">Color:</label>
            <div className="flex flex-wrap ">
              {product2.color.map((col, index) => (
                <button
                  className={`text-white border-2 border-black rounded-md m-4 p-2 ${colorPut === col ? 'bg-red-600' : 'bg-gray-500'}`}
                  onClick={() => handleClickColor(col)}
                  key={index}
                >
                  {col}
                </button>
              ))}
            </div>
            <label className='font-bold ' htmlFor="size">Size:</label>
            <div className="flex flex-wrap">
              {product2.size.map((siz, index) => (
                <button
                className={`text-white border-2 border-black rounded-md m-4 p-2 ${sizePut === siz ? 'bg-red-600' : 'bg-gray-500'}`}
                onClick={() => handleClickSize(siz)}
                  key={index}
                >
                  {siz}
                </button>
              ))}
            </div>
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
