import { useEntitiesContext } from "../context/useEntitiesContext";
import {  useNavigate } from 'react-router-dom';



const CardShoes = ({ typeShoe }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate= useNavigate();
    const {updateDetails}= useEntitiesContext();



  
    const handleFlip = () => {
        updateDetails(typeShoe);
        navigate("/shoe");
    }
    
    

    return (
        <div className="flex justify-center items-center flex-col bg-slate-100 w-80 m-4 p-4 border-none rounded-md" onClick={handleFlip}>
            <img src={`${apiUrl}${typeShoe.contentUrl}`} alt="productos" className="w-40"/>
            <p>Name: {typeShoe.name}</p>
            <p>Description: {typeShoe.description}</p>
            <p className="font-bold">{typeShoe.price} €</p>
            
        </div>
    );
}

export default CardShoes;
