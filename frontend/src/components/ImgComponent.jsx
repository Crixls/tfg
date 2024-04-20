import azulAsics from '../assets/zapatillas/asics/azul.webp'
import  blancoAsics from '../assets/zapatillas/asics/blanco.webp';

const ImgComponent = ({color,brand}) => {
    const imageSrc = color === 'azul' && brand==='asics' ? azulAsics : blancoAsics; // Agrega más condiciones si hay más colores

  return (
    <div>
      <img src={imageSrc} alt="image" />
    </div>
  )
}

export default ImgComponent
