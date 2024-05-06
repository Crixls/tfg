import  { useState, useEffect } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import Loaderanimated from "../../components/Loaderanimated";
const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login,setuserfinal } = useAuthContext();
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    if (token) {
      const { token: storedToken } = JSON.parse(token); //storedtoken es un alias
      login(storedToken);
      navigate("/");
    }
  }, [login, navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (username.trim() === "" || password.trim() === "") {
        console.error(
          "Por favor, ingresa tanto el nombre de usuario como la contraseña."
        );
        return;
      }

      const response = await fetch(`${apiUrl}/api/login_check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        await login(data.token);
        localStorage.setItem(
          "UserToken",
          JSON.stringify({ login: username, token: data.token })
        );
        navigate("/");
      } else {
        console.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
    }
    setLoading(false);
  };

  setuserfinal(username);

  const handleRegister = () => {
    navigate("/register");
  }


  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl lg:text-4xl font-bold">Login</h1>
        </div>
      </div>

      
      <div className="bg-white h-screen " style={{ backgroundImage: 'url(/src/assets/Texturelabs_Grunge_302M.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto mt-40 bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <input
                type="text"
                id="username"
                placeholder="Nombre de Usuario"
                className="block w-full py-3 px-4 mb-4 leading-tight rounded border-gray-300 focus:outline-none focus:border-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="block w-full py-3 px-4 mb-4 leading-tight rounded border-gray-300 focus:outline-none focus:border-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
                  {loading ? (
                <Loaderanimated/>
              ) : (
                <>
                  <button className="bg-gray-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline" onClick={handleLogin}>
                    Iniciar Sesión
                  </button>
                  <div className="pt-8 flex justify-center">
                    <p className="pr-2">¿No tienes cuenta?</p>
                    <button className="font-bold" onClick={handleRegister}>Regístrate</button>
                  </div>
                </>
              )}
            </div>
          </div>
        
          </div>
        </div>

    </>
  );
}

export default LoginPage;
