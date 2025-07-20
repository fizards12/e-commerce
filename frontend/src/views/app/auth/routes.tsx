import { RouteObject } from "react-router-dom";
import { loginAction, registerAction, registerLoader } from "./actionsAndLoader";
import AuthRoute from "../../../router/AuthRoute";
import LazyComponent from "../../../components/atoms/HOC/lazyComponent";
import ResetPassword from "./ResetPassword";
import ForgetPassword from "./ForgetPassword";
import Root from "./Root";
const Login = LazyComponent(() => import("./Login"));
const Register = LazyComponent(() => import("./Register"));
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
        element: <ForgetPassword />
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />
      }
    ],
  }