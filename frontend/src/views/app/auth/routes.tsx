import { RouteObject } from "react-router-dom";
import AuthorizedRoute from "../../../router/AuthorizedRoute";
import ProtectedRoute from "../../../router/ProtectedRoute";
import { loginAction, registerAction, registerLoader } from "./actionsAndLoader";
import AuthRoute from "../../../router/AuthRoute";
import LazyComponent from "../../../components/atoms/HOC/lazyComponent";
import Root from "./Root";
const Login = LazyComponent(() => import("./Login"));
const Register = LazyComponent(() => import("./Register"));
const ForgetPassword = LazyComponent(() => import("./ForgetPassword"));
export const authRoutes : RouteObject = {
    path: "auth",
    element: <AuthRoute element={<Root />} />,
    children: [
      {
        path: "login",
        element: <AuthRoute element={<Login />} />,
        action: loginAction,
      },
      {
        path: "register",
        element: <AuthRoute element={<Register />} />,
        loader: registerLoader,
        action: registerAction
      },
      {
        path: "forget-password",
        element: <AuthorizedRoute element={<ProtectedRoute element={<ForgetPassword />} />} role="TRADER" />
      }
    ],
  }