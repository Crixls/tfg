import  { useEffect } from 'react';
import errorimg from '../../src/assets/error/error.webp';


const ErrorCommercePage = () => {
  useEffect(() => {
    // Eliminar todo el contenido del localStorage
    localStorage.clear();
  }, []);

  return (
    <div className=" bg-black h-screen flex justify-center" > 
      <img src={errorimg} alt="image" className='h-80 md:h-2/3 md:w-2/3 sm:h-80 dm:w-h-80' />
    </div>
  );
}

export default ErrorCommercePage;
