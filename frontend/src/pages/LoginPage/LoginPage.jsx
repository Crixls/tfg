import  { useState, useEffect } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
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

  const handleRegister = () => {
    navigate("/register");
  }


  return (
    <>
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl lg:text-4xl font-bold">Login</h1>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <input
                type="text"
                id="username"
                placeholder="Nombre de Usuario"
                className="block w-full py-3 px-4 mb-4 leading-tight rounded border-gray-300 focus:outline-none focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="block w-full py-3 px-4 mb-4 leading-tight rounded border-gray-300 focus:outline-none focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              {loading ? (
                <div className="inline-block px-6 py-3 mr-4 mb-4 leading-none border border-solid border-transparent rounded-full text-white bg-indigo-500">
                  <span className="mr-2">Loading</span>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 013.709 7H1.187a10 10 0 009.436 11H7.708zm12-5.291a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-14 0C5.373 16 0 20.627 0 24h4a8 8 0 018-8V7H1.708z"></path>
                  </svg>
                </div>
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
