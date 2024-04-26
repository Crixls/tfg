import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import Swal from 'sweetalert2';
import { editOrderEntity } from '../../api/api';

const PaymentForm = ({total, order,user,date}) => {
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validar campos obligatorios
console.log(user);
            const updatedUserData = {
                state: 1, // Asegurarse de enviar state como 1
                user:user,
                total:total,
                date:date
            };

            const response = await editOrderEntity(order, updatedUserData);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario ha pagado correctamente!',
                    text: `El pago ha sido ${total}`,
                });
                setSuccess(true); // Establecer success en true después de un pago exitoso
            } else {
                console.error("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
        } finally {
            //   closeModal();
        }
    };

    return (
        <>
            {!success ? 
                <div className={`modal ${open ? 'open' : 'closed'} fixed inset-0 z-50 flex justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
                    <div className='bg-gray-200 p-24 rounded-md'>
                        <form onSubmit={handleSubmit} className='w-80'>
                            <fieldset className='FormGroup'>
                                <div className='FormRow'>
                                    <CardElement ></CardElement>
                                </div>
                            </fieldset>
                            <div className='flex justify-center mt-10'>
                                <button className='bg-black text-white pl-6 pr-6 p-2 rounded-md m-4'>Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div>
                    <h2 className='text-xl pl-10 pt-10 font-bold'>Has realizado tu compra con éxito</h2>
                </div>
            }
        </>
    );
};

export default PaymentForm;
