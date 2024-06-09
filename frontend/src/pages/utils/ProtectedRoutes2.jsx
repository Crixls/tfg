import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/useCases";


const ProtectedRoute2 = ({ user,redirect }) => {
  const { userLogged } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [storedUser, setStoredUser] = useState(null);

  const { userfinal } = useAuthContext();


  


  const isActive = !!userfinal ;

  if (!isActive) {
    return <Navigate to={redirect} replace />;
  }



  return <Outlet />;
};

export default ProtectedRoute2;
