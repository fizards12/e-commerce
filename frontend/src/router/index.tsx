import { createBrowserRouter, RouteObject } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import Root from "../views/Root";
import { dashboardRoutes } from "../views/dashboard/routes";
import LoadingState from "../components/LoadingState";
import { appRoutes } from "../views/app/routes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    HydrateFallback: LoadingState,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      appRoutes,
      dashboardRoutes
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
