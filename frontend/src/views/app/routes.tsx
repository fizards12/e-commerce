import { RouteObject } from "react-router-dom";
import Root from "./layout/Root";
import Home from "./views/Home";
import { authRoutes } from "./auth/routes";

const appRoutes: RouteObject = {
  path: "",
  element: <Root />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    authRoutes,
  ],
};

export { appRoutes };
