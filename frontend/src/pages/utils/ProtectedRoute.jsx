import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { getUsers } from "../../api/useCases";

const ProtectedRoute = ({ redirect }) => {
  const { userLogged } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUsers();
  }, []);

  console.log(users);

  useEffect(() => {
    const storedUser = localStorage.getItem('UserToken');
    if (storedUser) {
      setUserLogin(JSON.parse(storedUser));
      console.log(userLogin);
    }
  }, [users]);

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  // Verifica si el usuario tiene el rol necesario
  const isActive = users.some(
    (user) =>
      user.username === userLogin?.login && user.roles.includes("ROLE_ADMIN")
  );

  if (!isActive) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
