import StickyFooter from "./StickyFooter"
import fondo from '../assets/mapa.webp'


const Footer = () => {
  return (
    <StickyFooter>
      <div  className="relative bottom-0 left-0 w-full h-20 bg-cover bg-center" style={{backgroundImage: `url(${fondo})`}}>
      </div>
    </StickyFooter>

  )
}

export default Footer
