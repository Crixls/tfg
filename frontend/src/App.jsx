import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { EntitiesProvider } from "./context/useEntitiesContext";
import Home from "./pages/Home";
import ManPage from "./pages/ManPage/ManPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import WomanPage from "./pages/WomanPage/WomanPage";
import KidsPage from "./pages/KidsPage/KidsPage";
import ShoePage from "./pages/ShoePage/ShoePage";
import FutbolPage from "./pages/FutbolPage/FutbolPage";
import BasketPage from "./pages/BasketPage/BasketPage";
import BadmintonPage from "./pages/BadmintonPage/BadmintonPage";
import RunningPage from "./pages/RunningPage/RunningPage";
import FitnessPage from "./pages/FitnessPage/FitnessPage";
import TenisPage from "./pages/TenisPage/TenisPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./pages/utils/ProtectedRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPageProducts from "./pages/AdminPage/AdminPageProducts";
import AdminPageUsers from "./pages/AdminPage/AdminPageUsers";
import AdminEstadisticas from "./pages/AdminPage/AdminEstadisticas";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import PayPage from "./pages/PayPage/PayPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CartPage from "./pages/CartPage/CartPage";
import ErrorCommercePage from "./pages/ErrorCommercePage";

function App() {
  const [userLogged, setUserLogged] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUserLogged(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    setIsAdmin(Number(userId) === 3);
  }, []);
  
  return (
    <HashRouter>
      <AuthProvider>
        <EntitiesProvider>
          <Header />
          <Routes>
            {/* Rutas públicas sin Header y Footer */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas principales con Header y Footer */}
            <Route path="/" element={<Home />} />
            <Route path="/man" element={<ManPage />} />
            <Route path="/woman" element={<WomanPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/shoe" element={<ShoePage />} />
            <Route path="/futbol" element={<FutbolPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/badminton" element={<BadmintonPage />} />
            <Route path="/running" element={<RunningPage />} />
            <Route path="/fitness" element={<FitnessPage />} />
            <Route path="/tenis" element={<TenisPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<ErrorCommercePage />} />

            {/* Rutas de administración */}
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="/admin/products" element={isAdmin ? <AdminPageProducts /> : <Navigate to="/" />} />
            <Route path="/admin/users" element={isAdmin ? <AdminPageUsers /> : <Navigate to="/" />} />
            <Route path="/admin/estadisticas" element={isAdmin ? <AdminEstadisticas /> : <Navigate to="/" />} />

            {/* Rutas protegidas para usuarios autenticados */}
            <Route path="/favorites" element={userLogged ? <FavoritePage /> : <Navigate to="/login" />} />
            <Route path="/payment" element={userLogged ? <PayPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={userLogged ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/orders" element={userLogged ? <OrdersPage /> : <Navigate to="/login" />} />
            <Route path="/cart" element={userLogged ? <CartPage /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </EntitiesProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
