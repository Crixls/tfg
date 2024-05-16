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
import amarillo17 from '../assets/zapatillas/puma/amarillo17.webp'
import negro17 from '../assets/zapatillas/puma/negro17.webp'
import rosa39 from '../assets/zapatillas/asics/rosa39.webp'
import azul39 from '../assets/zapatillas/asics/azul39.webp'
import dorado41 from '../assets/zapatillas/puma/dorado41.webp'
import blanco41 from '../assets/zapatillas/puma/blanco41.webp'

const ImgComponent = ({color,name}) => {
  let imageSrc;
  name==="NIKE AL8" && color==="blanco"?imageSrc=blanco8:name==="NIKE AL8"?imageSrc=light8:"";
  name==="NIKE DUNK LOW RETRO" && color==="blanco"?imageSrc=blanco10:  name==="NIKE DUNK LOW RETRO" ?imageSrc=negro10:"";
  name==="AIR ZOOM" && color==="azul"?imageSrc=azulNike7:  name==="AIR ZOOM" ?imageSrc=blancoNike7:"";
  name==="GALAXY 6" && color==="rojo"?imageSrc=rojo12:  name==="GALAXY 6" ?imageSrc=azul12:"";
  name==="OZMILLEN UNISEX" && color==="blanco"?imageSrc=blanco6:  name==="OZMILLEN UNISEX" ?imageSrc=negro6:"";
  name==="550 UNISEX" && color==="rojo"?imageSrc=rojo3:  name==="550 UNISEX" ?imageSrc=azul3:"";
  name==="GEL-DEDICATE" && color==="azul"?imageSrc=azulAsics:  name==="GEL-DEDICATE" ?imageSrc=blancoAsics:"";
  name==="KING PRO FG/AG" && color==="amarillo"?imageSrc=amarillo17:  name==="KING PRO FG/AG" ?imageSrc=negro17:"";
  name==="GEL RESOLUTION"  && color==="rosa"?imageSrc=rosa39:  name==="GEL RESOLUTION" ?imageSrc=azul39:"";
  name==="CARINA 2.0"  && color==="dorado"?imageSrc=dorado41:  name==="CARINA 2.0" ?imageSrc=blanco41:"";

    return (
        <img className="lg:w-3/5 " src={imageSrc} alt="image" />
    );
}

export default ImgComponent
