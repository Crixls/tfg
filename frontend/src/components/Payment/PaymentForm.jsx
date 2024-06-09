// Método de pago

import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { editOrderEntity } from '../../api/api';
import { Navigate } from 'react-router-dom';

const PaymentForm = ({ total, order, user, date }) => {
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedUserData = {
                state: 1, 
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
                    setSuccess(true); 
                    setRedirect(true); 
                });
            } else {
                console.error("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
        }
    };

    const handleReturn = () => {
        setRedirect(true); 
    };

    if (redirect) {
        return <Navigate to="../" />;
    }

    return (
        <>
            {!success ?
                <div className="modal open fixed inset-0 z-50 flex justify-center items-center">
                    <div className='bg-gray-200 p-24 rounded-md'>
                        <form onSubmit={handleSubmit} className='w-80'>
                            <fieldset className='FormGroup'>
                                <div className='FormRow'>
                                    <CardElement />
                                </div>
                            </fieldset>
                            <div className='flex justify-center mt-10'>
                                <button type='submit' className='bg-black text-white p-2 rounded'>
                                    Pagar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <div>
                    <h2 className='text-xl pl-10 pt-10 font-bold'>Has realizado el pago correctamente</h2>
                    <button className='border-2 border-black rounded-lg m-4 font-bold p-2' onClick={handleReturn}>
                        Volver
                    </button>
                </div>
            }
        </>
    );
};

export default PaymentForm;
