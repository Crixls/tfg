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

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="h-screen" style={{ backgroundImage: 'url(/src/assets/admin.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-black">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl lg:text-4xl font-bold">Admin Page</h1>
        </div>
      </div>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="m-20">
          <button className="mr-40 bg-gray-500  rounded-md text-white p-8 font-medium text-lg" onClick={handleProduct}>Productos</button>
          <button className="ml-40 bg-gray-500  rounded-md p-8 text-white font-medium text-lg" onClick={handleUsuarios}>Usuarios</button>
        </div>
        <div className="m-40">
          <button className="rounded-md  bg-black p-8 pl-12 pr-12 font-medium text-white text-lg " onClick={handleReturn}>
            Volver inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
