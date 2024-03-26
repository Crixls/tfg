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
      { path: "/favorites", element: <FavoritePage /> },
      { path: "/shoe", element: <ShoePage /> },
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