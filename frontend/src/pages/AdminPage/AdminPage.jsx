import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleProduct = () => {
    navigate("/admin/products");
  };

  const handleUsuarios = () => {
    navigate("/admin/users");
  };
  const handleEstadisticas = () => {
    navigate("/admin/estadisticas");
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="h-20vh" style={{ backgroundImage: 'url(/src/assets/admin.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-black relative">
        <div className=" bg-black w-full container px-4 p-8">
          <h1 className="text-white text-3xl lg:text-4xl font-bold">Admin Page</h1>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center md:h-screen ">
        <div className="m-20 md:flex md:flex-col md:justify-center md:items-center">
          <button className="lg:mr-40 md:mb-20 bg-gray-500  rounded-md text-white p-8 font-medium text-lg" onClick={handleProduct}>Productos</button>
          <button className="lg:ml-40 md:mb-20 lg:mr-40 bg-gray-500  rounded-md p-8 text-white font-medium text-lg" onClick={handleUsuarios}>Usuarios</button>
          <button className="lg:ml-40 md:mb-10 bg-gray-500  rounded-md p-8 text-white font-medium text-lg" onClick={handleEstadisticas}>Estadísticas</button>
        </div>
        <div className="lg:m-40">
          <button className="rounded-md  bg-black p-8 pl-12 pr-12 font-medium text-white text-lg " onClick={handleReturn}>
            Volver inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
