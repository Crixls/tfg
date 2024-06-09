
import axios from 'axios';

const catchUsers = async () => {

  // 'https://127.0.0.1:8000/api/users' 

  const url = 'http://localhost:8000/api/users';
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

export default catchUsers;
