import React, { useContext } from "react";
import Loader from "../Components/Loader/Loader";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../Context/AuthContext";


const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { firebaseUser, loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  if (!firebaseUser) {
    return <Navigate state={location.pathname}  to="/login" />;
  }

  return children;
};

export default PrivateRouter;
