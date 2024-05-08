import React, { useState } from 'react';
import ModalCardOrder from './ModalCardOrder';

const CardOrders = ({ order }) => {
    const [open, setOpen] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(); // Formatea la fecha en el formato local
        return formattedDate;
    };

    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleClick = () => {
        setSelectedOrder(order);
        setOpen(true);
    }

    
    const handleCloseModal2 = () => {
        setOpen(false);
    };


    return (
        <>
            {open &&  <ModalCardOrder  open={open} closeModal={handleCloseModal2}  order={selectedOrder}></ModalCardOrder>}
            <div className='p-10 m-10 border-2 rounded-lg cursor-pointer sm:m-40' onClick={handleClick}>
                <p className='text-lg'>Fecha: {formatDate(order.date)}</p>
                <br />
                <p className='text-xl font-bold'>Total: {order.total}</p>
            </div>
        </>
    );
};

export default CardOrders;
