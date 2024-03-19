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
    },
    body: dto,
  });
  if (!response.ok) {
    throw new Error(
      `Error en la petición POST al endpoint: ${endpoint} (${response.status} ${response.statusText})`
    );
  }
  const data = await response.json();
  return data;
};