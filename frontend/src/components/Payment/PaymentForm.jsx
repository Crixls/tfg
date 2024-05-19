import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import Swal from 'sweetalert2';
import { editOrderEntity } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, order, user, date }) => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validar campos obligatorios
            const updatedUserData = {
                state: 1, // Asegurarse de enviar state como 1
                user: user,
                total: total,
                date: date
            };

            const response = await editOrderEntity(order, updatedUserData);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario ha pagado correctamente!',
                    text: `El pago ha sido ${total}€`,
                }).then(() => {
                    setSuccess(true); // Establecer success en true después de un pago exitoso
                    navigate("../"); // Redirigir al usuario a la ruta '../'
                });
            } else {
                console.error("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
        }
    };

    const handleReturn = () => {
        navigate("../");
    };

    return (
        <>
            {!success ?
                <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className='bg-gray-200 p-24 rounded-md'>
                        <form onSubmit={handleSubmit} className='w-80'>
                            <fieldset className='FormGroup'>
                                <div className='FormRow'>
                                    <CardElement ></CardElement>
                                </div>
                            </fieldset>
                            <div className='flex justify-center mt-10'>
                                <button className='bg-black text-white pl-6 pr-6 p-2 rounded-md m-4'>Realizar pago</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div>
                    <h2 className='text-xl pl-10 pt-10 font-bold'>Has realizado tu compra con éxito</h2>
                    <button className='border-2 border-black rounded-lg m-4 font-medium p-2' onClick={handleReturn}>Volver</button>
                </div>
            }
        </>
    );
};

export default PaymentForm;
