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
    const favoritos = data["hydra:member"]?data["hydra:member"]:data; // Aquí obtienes la lista de favoritos

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


export const deleteProduct = async (productId) => {
  console.log({apiUrl});
  try {
    const apiUrl2 = `${apiUrl}/api/products/`;
    const endpoint = `${apiUrl2}${productId}`;

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

export const deleteOrderLine = async (orderLineId) => {
  try {
    const apiUrl2 = `${apiUrl}/api/order_lines/`;
    const endpoint = `${apiUrl2}${orderLineId}`;

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

export const deleteUser = async (userId) => {
  try {
    const apiUrl2 = `${apiUrl}/api/users/`;
    const endpoint = `${apiUrl2}${userId}`;

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

export const deleteFav = async (endpoint2) => {
  try {

    // const apiUrl = import.meta.env.VITE_API_URL;

    console.log(endpoint2);

    const endpoint = `${apiUrl}${endpoint2}`;

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


// Función para actualizar un producto
export const updateProduct = async (productId, updatedProductData) => {
  try {
    const apiUrl2 = `${apiUrl}/products/`;
    const endpoint = `${apiUrl2}${productId}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json"); // Cambiado a "application/json"

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(updatedProductData), // Enviar los datos directamente como JSON
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

export const updateOrderLine = async (orderLineId, updatedOrderData) => {
  try {
    const apiUrl2 = `${apiUrl}/api/order_lines/`;
    const endpoint = `${apiUrl2}${orderLineId}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json"); // Cambiado a "application/json"

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(updatedOrderData), // Enviar los datos directamente como JSON
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


export const sendProductFormData = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  console.log(requestOptions);

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


export const postProduct = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  console.log(requestOptions);

  try {
    const response = await fetch(`${apiUrl}/productsfinales`, requestOptions);
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

export const postFav = async (endpoint, userApiPath, productApiPath) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json"); // Agrega el encabezado Content-Type

  // Crea el cuerpo de la solicitud en formato JSON
  const requestBody = JSON.stringify({
    user: userApiPath,
    product: productApiPath
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: requestBody, // Utiliza el cuerpo JSON creado anteriormente
    redirect: "follow",
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
}




export const updateUser = async (userId, updatedUserData) => {
  console.log(updatedUserData);
  try {
    const apiUrl2 = `${apiUrl}/api/users/`;
    const endpoint = `${apiUrl2}${userId}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/ld+json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(updatedUserData), // Convertir a JSON
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

export const post2 = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");
  myHeaders.append("Content-Type", "application/json");

  const formDataObject = Object.fromEntries(formData.entries());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formDataObject),
    redirect: "follow",
  };
  console.log(requestOptions);
  
  try {
    const response = await fetch(`${apiUrl}/api/users`, requestOptions);
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
export const postOrderEntity = async (formData) => {
    
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");
  myHeaders.append("Content-Type", "application/json");


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData),
    redirect: "follow",
  };
  console.log(requestOptions);
  
  try {
    const response = await fetch(`${apiUrl}/api/order_entities`, requestOptions);
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

export const postOrderLine = async (formData) => {
    
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/ld+json");
  myHeaders.append("Content-Type", "application/json");


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formData),
    redirect: "follow",
  };
  console.log(requestOptions);
  
  try {
    const response = await fetch(`${apiUrl}/api/order_lines`, requestOptions);
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

