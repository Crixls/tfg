import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/useCases";

const ProtectedRoute2 = ({ redirect }) => {
  const { userLogged } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [storedUser, setStoredUser] = useState(false);

  useEffect(() => {
    const storedUser2 = localStorage.getItem('UserToken');
    if (storedUser2) {
      console.log(storedUser2);
     // Parse the storedUser string to JSON
      setStoredUser(JSON.parse(storedUser2));
    }
  }, []);
  console.log(storedUser);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchApi();
  }, [users]);

  

  const isActive = !!storedUser;
  console.log(isActive);
  if (!isActive || null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;


  // const user = users.find(
  //   (user) =>
  //     user.username === storedUser?.login && // Access the login property of storedUser
  //     user.roles.includes("ROLE_ADMIN")
  // );

//   return <Outlet />;
};

export default ProtectedRoute2;
