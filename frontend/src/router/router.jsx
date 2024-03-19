import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import ErrorCommercePage from "../pages/ErrorCommercePage";
import ProtectedRoute from "../pages/utils/ProtectedRoute";
import Home from "../pages/Home";
import ManPage from "../pages/ManPage/ManPage";
import WomanPage from "../pages/WomanPage/WomanPage";
import KidsPage from "../pages/KidsPage/KidsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";
import CartPage from "../pages/CartPage/CartPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AdminPage from "../pages/AdminPage/AdminPage";

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
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/favorites", element: <FavoritePage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
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
