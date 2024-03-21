const apiUrl = import.meta.env.VITE_API_URL;

const replacer = (key, value) => {
  if (typeof value === "number") {
    return value;
  }
  return value;
};

export const get = async (endpoint) => {
  try {
    const response = await fetch(apiUrl + endpoint);

    if (!response.ok) {
      throw new Error(
        `Error en la petición GET al endpoint: ${endpoint} (${response.status} ${response.statusText})`
      );
    }
    const data = await response.json();
    console.log(data)
    const favoritos = data["hydra:member"]?data["hydra:member"]:data; // Aquí obtienes la lista de favoritos

    console.log(favoritos)
    return favoritos;
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    throw error;
  }
};

export const post = async (endpoint, dto) => {
  const token = JSON.parse(localStorage.getItem("UserToken"))?.token;
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/ld+json", // Ajustar el tipo de contenido
    },
    body: JSON.stringify(dto),
  });

  console.log(dto);
  if (!response.ok) {
    throw new Error(
      `Error en la petición POST al endpoint: ${endpoint} (${response.status} ${response.statusText})`
    );
  }

  const data = await response.json();
  return data;
};



export const put = async (endpoint, dto) => {
  const token = JSON.parse(localStorage.getItem("UserToken"))?.token;
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto, replacer),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la petición POST al endpoint: ${endpoint} (${response.status} ${response.statusText})`
    );
  }
  const data = await response.json();
  return data;
};

export const deleteMethod = async (endpoint) => {
  const token = JSON.parse(localStorage.getItem("UserToken"))?.token;
  await fetch(`${apiUrl}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const sendProductFormData = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiUrl}/api/products/image`, requestOptions);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const apiUrl = 'https://127.0.0.1:8000/api/products/';
    const endpoint = `${apiUrl}${productId}`;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`Error en la solicitud DELETE: ${response.status} ${response.statusText}`);
    }

    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error en la eliminación del producto:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    const apiUrl2 = 'https://127.0.0.1:8000/api/products/';
    const endpoint = `${apiUrl2}${productId}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(updatedProductData), // Convertir a JSON
      redirect: "follow"
    };

    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`Error en la solicitud PUT: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.text();
    console.log(result); // Imprimir la respuesta si es necesario
    return result; // O devolver la respuesta si se necesita en otro lugar
  } catch (error) {
    console.error("Error en la actualización del producto:", error);
    throw error; // Lanzar el error para manejarlo en el componente que llama a esta función
  }

  
};

