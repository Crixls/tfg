import  { useEffect } from 'react';
import errorimg from '../../src/assets/error/error.webp';


const ErrorCommercePage = () => {
  useEffect(() => {
    // Eliminar todo el contenido del localStorage
    localStorage.clear();
  }, []);

  return (
    <div className=" bg-black h-screen flex justify-center" > 
      <img src={errorimg} alt="image" className='w-2/3 md:h-2/3 md:w-full sm:h-2/3 sm:w-screen' />
    </div>
  );
}

export default ErrorCommercePage;
