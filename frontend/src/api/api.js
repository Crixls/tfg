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