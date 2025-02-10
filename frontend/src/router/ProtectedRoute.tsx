import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { JSX } from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

export default ProtectedRoute