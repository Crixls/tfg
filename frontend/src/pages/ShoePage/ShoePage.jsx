
import { useEntitiesContext } from "../../context/useEntitiesContext";

const ShoePage = () => {
  // Obtener la ubicación actual, incluido el estado pasado desde el enlace
  // Extraer los datos del zapato del estado pasado

  const {dataDetails}  = useEntitiesContext();
  const apiUrl = import.meta.env.VITE_API_URL;


  return (
    <div className="grid grid-cols-2 m-20">
      <div><img src={`${apiUrl}${dataDetails.contentUrl}`} alt="imagen" /></div>
      <div className="pl-10">
        <p className="mb-4 text-xl font-bold">{dataDetails.name}</p>
        <p className="mb-4">{dataDetails.brand}</p>
        <p className="mb-4">{dataDetails.price}</p>
      </div>
      
      
    </div>
  );
};

export default ShoePage;
