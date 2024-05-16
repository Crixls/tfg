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
        localStorage.setItem(
            "detailsProduct",
            JSON.stringify({ product: typeShoe })
          );
        navigate("/shoe");
    }
    
    

    return (
        <div className="lg:flex lg:justify-center lg:items-center lg:flex-col lg:w-1/2 lg:m-4 lg:p-4 border-none rounded-md cursor-pointer md:justify-center md:flex flex items-center flex-col " onClick={handleFlip}>
            <div className="lg:flex lg:justify-center lg:items-center lg:flex-col md:flex md:justify-center bg-slate-100 lg:w-80 lg:m-4 lg:p-4 border-none rounded-md md:w-3/4 md:p-4 sm:m-8 m-10 p-8"  style={{ backgroundImage: 'url(/src/assets/Texturelabs_Grunge_193M.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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