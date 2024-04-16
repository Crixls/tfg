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
import AdminPageProducts from "../pages/AdminPage/AdminPageProducts";
import ProtectedRoute from "../pages/utils/ProtectedRoute";
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
      { path: "/cart", element: <CartPage /> },
      { path: "/shoe", element: <ShoePage /> },
      { path: "/futbol", element: <FutbolPage /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/badminton", element: <BadmintonPage /> },
      { path: "/running", element: <RunningPage /> },
      { path: "/fitness", element: <FitnessPage /> },
      { path: "/tenis", element: <TenisPage /> },


      { path: "/favorites", element: <FavoritePage /> },
      { path: "/payment", element: <PayPage /> },
      { path: "/profile", element: <ProfilePage /> }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register", 
    element: <RegisterPage />
  },
  { 
    path: "/admin", 
    element: <RootLayout />,
    errorElement: <ErrorCommercePage />,
    
    children: [
      {
        element: <ProtectedRoute redirect="/login" />, // Redirige a la página de inicio de sesión si el usuario no está autenticado
        children:[
          { index: true, element: <AdminPage /> },
          { path: "products", element: <AdminPageProducts /> }, // Quitamos la barra inicial para indicar que es relativa a la ruta "/admin"
          { path: "users", element: <AdminPageUsers /> }, // Quitamos la barra inicial para indicar que es relativa a la ruta "/admin"
        ]
      }
     
    ],
  },
]);


export default router;
// import { createBrowserRouter } from "react-router-dom";
// import RootLayout from "../pages/RootLayout";
// import ErrorCommercePage from "../pages/ErrorCommercePage";
// import ProtectedRoute from "../pages/utils/ProtectedRoute";
// import Home from "../pages/Home";
// import ManPage from "../pages/ManPage/ManPage";
// import WomanPage from "../pages/WomanPage/WomanPage";
// import KidsPage from "../pages/KidsPage/KidsPage";
// import LoginPage from "../pages/LoginPage/LoginPage";
// import FavoritePage from "../pages/FavoritePage/FavoritePage";
// import CartPage from "../pages/CartPage/CartPage";
// import RegisterPage from "../pages/RegisterPage/RegisterPage";
// import AdminPage from "../pages/AdminPage/AdminPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorCommercePage />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "/man", element: <ManPage /> },
//       { path: "/woman", element: <WomanPage /> },
//       { path: "/kids", element: <KidsPage /> },
//       { path: "/register", element: <RegisterPage /> },
//       {
//         // Define la ruta protegida y sus hijos dentro de este objeto de ruta principal
//         element: <ProtectedRoute redirect="/login" />,
//         children: [
//           { path: "/cart", element: <CartPage /> },
//           { path: "/favorites", element: <FavoritePage /> },
//           { path: "/admin", element: <AdminPage /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
// ]);

// export default router;