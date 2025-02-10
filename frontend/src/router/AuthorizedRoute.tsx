import { RootState } from "../stores";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IRole } from "../schemas/role";

const AuthorizedRoute = ({
  element,
  role,
}: {
  element: JSX.Element;
  role: string;
}) => {
  const userRole = useSelector(
    (state: RootState) => state.auth.user?.role
  ) as IRole;
  const isAuthorized = userRole?.name == role;
  return !isAuthorized ? <Navigate to="/auth/login" /> : element;
};

export default AuthorizedRoute;
