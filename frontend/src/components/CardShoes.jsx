import { useEntitiesContext } from "../context/useEntitiesContext";
import {  useNavigate } from 'react-router-dom';
import { LazyLoadImage} from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';


const CardShoes = ({ typeShoe }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate= useNavigate();
    const {updateDetails}= useEntitiesContext();



  
    const handleFlip = () => {
        updateDetails(typeShoe);
        navigate("/shoe");
    }
    
    

    return (
        <div className="flex justify-center items-center flex-col w-80 m-4 p-4 border-none rounded-md cursor-pointer" onClick={handleFlip}>
            <div className="flex justify-center items-center flex-col bg-slate-100 w-80 m-4 p-4 border-none rounded-md"  style={{ backgroundImage: 'url(/src/assets/Texturelabs_Grunge_193M.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <LazyLoadImage effect="blur"  src={`${apiUrl}${typeShoe.contentUrl}`} alt="productos" className="w-40"/>
            </div>
            <div className=" flex justify-between w-80">
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
