import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../views/Home";
import Root from "../views/Root";
import { dashboardRoutes } from "../views/dashboard/routes";
import { authRoutes } from "../views/auth/routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      authRoutes,
      dashboardRoutes
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
