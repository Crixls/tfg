import { createContext, useContext, useState, useEffect } from "react";
// import { getUserInfo } from "../api/useCases";

// Obtiene la URL de la API del entorno de Vite
const apiUrl = import.meta.env.VITE_API_URL;

// Crea el contexto de autenticación
const AuthContext = createContext();

// Componente proveedor de autenticación
export const AuthProvider = (props) => {
  const { children } = props;

  // Estado del usuario autenticado y el token
  const [logged, setLogged] = useState(null);
  const [userL, setuserL] = useState(null);
  const [userLogged, setUserLogged]= useState(null);
  const [users2, setUsers2]= useState([]);
  const [token, setToken] = useState(null);


  // Obtiene el estado inicial del token de usuario desde el almacenamiento local
  useEffect(() => {
    const initialState = JSON.parse(localStorage.getItem("UserToken")) ?? null;
    if (initialState) {
      setToken(initialState.token);
      setLogged(initialState.login);
    }
  }, []);

  // Función para obtener la información del usuario desde la API
  const getUserInfo = async (newToken) => {
    try {
      const response = await fetch(`${apiUrl}/api/getuserinfo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${newToken}`,
          accept: "application/json",
        },
      });
      if (!response.ok)
        throw new Error("No se pudo obtener la información del usuario");
      // console.log("getuserinfo response:", response);
      const data = await response.json();
      // console.log("getuserinfo data:", data);
      return data;
    } catch (error) {
      console.error("Error en getUserInfo:", error);
      throw error;
    }
  };

  const login = async (newToken) => {
    try {
      // Llama a `getUserInfo` para obtener la información del usuario
      const userObject = await getUserInfo(newToken);
      setLogged(userObject);
      console.log(userObject);
      setToken(newToken);
      // Almacena el token de usuario en el almacenamiento local
      localStorage.setItem(
        "UserToken",
        JSON.stringify({ login: userObject, token: newToken })
      );
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("UserToken");
    setToken(null);
    setLogged(null);
  };
  
  return (
    <AuthContext.Provider value={{ logged, login, logout, token ,setLogged , userLogged, setUserLogged, users2, setUsers2,userL,setuserL}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuthContext = () => {
  return useContext(AuthContext);
};
