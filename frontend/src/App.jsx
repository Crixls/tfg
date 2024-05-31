import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { EntitiesProvider } from "./context/useEntitiesContext";
import Home from "./pages/Home";
import ManPage from "./pages/ManPage/ManPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WomanPage from "./pages/WomanPage/WomanPage";
import KidsPage from "./pages/KidsPage/KidsPage";
import ShoePage from "./pages/ShoePage/ShoePage";
import FutbolPage from "./pages/FutbolPage/FutbolPage";
import BasketPage from "./pages/BasketPage/BasketPage";
import BadmintonPage from "./pages/BadmintonPage/BadmintonPage";
import RunningPage from "./pages/RunningPage.jsx/RunningPage";
import FitnessPage from "./pages/FitnessPage.jsx/FitnessPage";
import TenisPage from "./pages/TenisPage/TenisPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./pages/utils/ProtectedRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPageProducts from "./pages/AdminPage/AdminPageProducts";
import AdminPageUsers from "./pages/AdminPage/AdminPageUsers";
import AdminEstadisticas from "./pages/AdminPage/AdminEstadisticas";
import PrivateRoutes from "./components/routesP/PrivateRoutes";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import PayPage from "./pages/PayPage/PayPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CartPage from "./pages/CartPage/CartPage";
import RootLayout from "./pages/RootLayout";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <EntitiesProvider>
          <Routes>
            {/* Rutas públicas sin Header y Footer */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas principales con Header y Footer */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="man" element={<ManPage />} />
              <Route path="woman" element={<WomanPage />} />
              <Route path="kids" element={<KidsPage />} />
              <Route path="shoe" element={<ShoePage />} />
              <Route path="futbol" element={<FutbolPage />} />
              <Route path="basket" element={<BasketPage />} />
              <Route path="badminton" element={<BadmintonPage />} />
              <Route path="running" element={<RunningPage />} />
              <Route path="fitness" element={<FitnessPage />} />
              <Route path="tenis" element={<TenisPage />} />
              <Route path="search" element={<SearchPage />} />
            </Route>

            <Route 
              path="/admin" 
              element={<ProtectedRoute redirect="/"></ProtectedRoute>}
            >
              <Route index element={<AdminPage />} />
              <Route path="products" element={<AdminPageProducts />} />
              <Route path="users" element={<AdminPageUsers />} />
              <Route path="estadisticas" element={<AdminEstadisticas />} />
            </Route>

            <Route element={<PrivateRoutes redirect="/login"><PrivateLayout /></PrivateRoutes>}>
              <Route path="favorites" element={<FavoritePage />} />
              <Route path="payment" element={<PayPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>


          </Routes>
        </EntitiesProvider>
      </AuthProvider>
    </HashRouter>
  );
}




function PrivateLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="payment" element={<PayPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
