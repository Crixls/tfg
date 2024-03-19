import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const ProtectedRoute = ({ redirect }) => {
  const {logged} = useAuthContext();

  // console.log('logged:', a);

  // cargamos el estado grobal
  const isActive = !!logged.username;
  if (!isActive) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
