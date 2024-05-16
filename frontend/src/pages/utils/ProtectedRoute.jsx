import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

import { getUsers } from "../../api/useCases";

const ProtectedRoute = ({ redirect }) => {
  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState(null);
  const { userfinal,users2,logged,userLogged } = useAuthContext();




  // Verifica si el usuario tiene el rol necesario
  const isActive = users2.some(
    (user) =>
      user.username === logged?logged:userfinal && user.roles.includes("ROLE_ADMIN")
  );

  if (!isActive) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
