import { RootState } from '../stores';
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ element }: { element: JSX.Element }) => {
      const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

export default AuthRoute