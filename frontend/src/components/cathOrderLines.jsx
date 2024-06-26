import axios from 'axios';

const catchOrderLines = async () => {
  // 'https://127.0.0.1:8000/api/order_lines' 
  const url = 'http://localhost:8000/api/order_lines'; 
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

export default catchOrderLines;
