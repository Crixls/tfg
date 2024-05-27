import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import ErrorCommercePage from "../pages/ErrorCommercePage";
import Home from "../pages/Home";
import ManPage from "../pages/ManPage/ManPage";
import WomanPage from "../pages/WomanPage/WomanPage";
import KidsPage from "../pages/KidsPage/KidsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import CartPage from "../pages/CartPage/CartPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProtectedRoute from "../pages/utils/ProtectedRoute";
import AdminPageProducts from "../pages/AdminPage/AdminPageProducts";
import AdminPageUsers from "../pages/AdminPage/AdminPageUsers";
import ShoePage from "../pages/ShoePage/ShoePage";
import PayPage from "../pages/PayPage/PayPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import FutbolPage from "../pages/FutbolPage/FutbolPage";
import BasketPage from "../pages/BasketPage/BasketPage";
import BadmintonPage from "../pages/BadmintonPage/BadmintonPage";
import RunningPage from "../pages/RunningPage.jsx/RunningPage";
import FitnessPage from "../pages/FitnessPage.jsx/FitnessPage";
import TenisPage from "../pages/TenisPage/TenisPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import AdminEstadisticas from "../pages/AdminPage/AdminEstadisticas";
import ProtectedRoute2 from "../pages/utils/ProtectedRoutes2";
import PrivateRoutes from "../components/routesP/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorCommercePage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/man", element: <ManPage /> },
      { path: "/woman", element: <WomanPage /> },
      { path: "/kids", element: <KidsPage /> },
      { path: "/shoe", element: <ShoePage /> },
      { path: "/futbol", element: <FutbolPage /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/badminton", element: <BadmintonPage /> },
      { path: "/running", element: <RunningPage /> },
      { path: "/fitness", element: <FitnessPage /> },
      { path: "/tenis", element: <TenisPage /> },
      { path: "/search", element: <SearchPage /> },
      
    ],
  },
  
  { 
    path: "/admin", 
    element: <ProtectedRoute redirect="/" />, 
    children: [
      {
        // No necesitamos "/" aquí, ya que estas rutas son relativas a "/admin"
        children:[
          { index: true, element: <AdminPage /> },
          { path: "products", element: <AdminPageProducts /> }, 
          { path: "users", element: <AdminPageUsers /> }, 
          { path: "estadisticas", element: <AdminEstadisticas /> }, 
        ]
      }
      
    ],
  },
  {
    path: "/", // Ruta raíz
    element: <RootLayout />, // Utiliza RootLayout como contenedor principal
    children: [
      {
        // Rutas secundarias relativas a "/"
        element: <PrivateRoutes redirect="/login" />, // Protege las rutas secundarias con PrivateRoutes
        children:[
          { path: "/favorites", element: <FavoritePage /> }, // Ruta para la página de favoritos
          { path: "/payment", element: <PayPage /> }, // Ruta para la página de pago
          { path: "/profile", element: <ProfilePage /> }, // Ruta para la página de perfil
          { path: "/orders", element: <OrdersPage /> }, // Ruta para la página de pedidos
          { path: "/cart", element: <CartPage /> }, // Ruta para la página de carrito de compras
        ]
      }
    ]
  },
  { path: "/register", element: <RegisterPage />},

  {
    path: "/login",
    element: <LoginPage />,
  }
]);



export default router;
