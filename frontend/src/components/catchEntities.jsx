import axios from 'axios';

const catchEntities = async () => {
  const url = 'https://127.0.0.1:8000/api/order_entities'; // Reemplaza 'tu-url-api/products' con la URL de tu endpoint
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
   
  } catch (error) {
    condition = false;
    console.error('Error:', error);
  }

  return allProducts;
};

export default catchEntities;
