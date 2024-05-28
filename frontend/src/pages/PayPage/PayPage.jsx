import { useState } from "react";
import StripeContainer from "../../components/Payment/StripeContainer"
import fondo from "../../assets/favorite/favoritetext.jpg";

const PayPage = () => {
  const [showItem,setShowItem]= useState(false);
  return (
    <>
       <div className="p-4 mt-10" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
        <p className="text-white flex w-full text-2xl font-bold">Pago</p>
        {showItem ? <StripeContainer></StripeContainer>:""}
      </div>
      
    </>
  )
}

export default PayPage
