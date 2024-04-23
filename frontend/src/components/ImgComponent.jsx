import azulAsics from '../assets/zapatillas/asics/azul.webp'
import blancoAsics from '../assets/zapatillas/asics/blanco.webp';
import azulNike7 from '../assets/zapatillas/Nike/azul.webp'
import blancoNike7 from '../assets/zapatillas/Nike/blanco.webp';
import light8 from '../assets/zapatillas/Nike/light8.webp'
import blanco8 from '../assets/zapatillas/Nike/blanco8.webp';
import negro10 from '../assets/zapatillas/Nike/negro10.webp'
import blanco10 from '../assets/zapatillas/Nike/blanco10.webp'
import azul12 from '../assets/zapatillas/adidas/azul12.webp'
import rojo12 from '../assets/zapatillas/adidas/rojo12.webp'
import blanco6 from '../assets/zapatillas/adidas/blanco6.webp'
import negro6 from '../assets/zapatillas/adidas/negro6.webp'
import azul3 from '../assets/zapatillas/balance/azul3.webp'
import rojo3 from '../assets/zapatillas/balance/rojo3.webp'

const ImgComponent = ({color,brand,name}) => {
  let imageSrc;
  console.log(name);
  name==="NIKE AL8" && color==="blanco"?imageSrc=blanco8:name==="NIKE AL8"?imageSrc=light8:"";
  name==="NIKE DUNK LOW RETRO" && color==="blanco"?imageSrc=blanco10:  name==="NIKE DUNK LOW RETRO" ?imageSrc=negro10:"";
  name==="AIR ZOOM" && color==="azul"?imageSrc=azulNike7:  name==="AIR ZOOM" ?imageSrc=blancoNike7:"";
  name==="GALAXY 6" && color==="rojo"?imageSrc=rojo12:  name==="GALAXY 6" ?imageSrc=azul12:"";
  name==="OZMILLEN UNISEX" && color==="blanco"?imageSrc=blanco6:  name==="OZMILLEN UNISEX" ?imageSrc=negro6:"";
  name==="550 UNISEX" && color==="rojo"?imageSrc=rojo3:  name==="550 UNISEX" ?imageSrc=azul3:"";
  name==="GEL-DEDICATE" && color==="azul"?imageSrc=azulAsics:  name==="GEL-DEDICATE" ?imageSrc=blancoAsics:"";

    return (
        <img className="w-3/5" src={imageSrc} alt="image" />
    );
}

export default ImgComponent
