import  { useEffect } from 'react';

const ErrorCommercePage = () => {
  useEffect(() => {
    // Eliminar todo el contenido del localStorage
    localStorage.clear();
  }, []);

  return (
    <div>
      error
    </div>
  );
}

export default ErrorCommercePage;
