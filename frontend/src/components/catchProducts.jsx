import axios from 'axios';

const catchProducts = async () => {
  // 'https://127.0.0.1:8000/api/products'
   
  const url = 'http://localhost:8000/api/products'; // Reemplaza 'tu-url-api/products' con la URL de tu endpoint
  let allProducts = [];
  let page = 1;
  let condition = false;

  try {
    while (!condition) {
      const response = await axios.get(url, { params: { page } });
      const { data } = response;

      if (!data || data.length === 0) {
        break;
      }

      allProducts = allProducts.concat(data);
      page++;
    }

    // Guardar en localStorage
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  } catch (error) {
    condition = false;
    console.error('Error:', error);
  }

  return allProducts;
};

export default catchProducts;
