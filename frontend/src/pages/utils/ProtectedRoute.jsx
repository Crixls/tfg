import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/useCases";

const ProtectedRoute = ({ redirect }) => {
  const {userLogged, logged} = useAuthContext();
  const [users, setusers] = useState([]);


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getUsers();
        setusers(data);
        console.log("Productos hombre:", data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, []);

  const user =users.filter((user)=>{
    console.log(user.username);

    if(user.roles.includes("ROLE_ADMIN") && user.username===userLogged){
      console.log(user);
      return user
    }else{
      console.log("error");
    }
  })

  console.log(user);

  const isActive = !!user;
  console.log(isActive);
  if (!isActive || null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;