import React, { useEffect } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/useAuthContext';


const PrivateRoutesAdmin = ({redirect}) => {
  const userName = localStorage.getItem('UserName');
  const {users2 } = useAuthContext();

  console.log(userName)
  console.log(users2)

  const isAdmin = users2.find(
    (user) =>
      user.username === userName?.user &&
      user.roles.includes("ROLE_ADMIN")
  );

  if (!isAdmin) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet/>;
};

export default PrivateRoutesAdmin;
