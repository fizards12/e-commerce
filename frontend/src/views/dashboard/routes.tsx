import { Navigate, RouteObject } from "react-router-dom";
import LazyComponent from "../../components/atoms/HOC/lazyComponent";
import AuthorizedRoute from "../../router/AuthorizedRoute";
import ProtectedRoute from "../../router/ProtectedRoute";
import ProductsRoot from "./views/Products/Root";
import CategoriesRoot from "./views/Categories/Root";
import NewProduct from "./views/Products/NewProduct";
import NewCategory from "./views/Categories/NewCategory";
import ErrorElement from "./layout/ErrorElement";
import { authRoutes } from "./auth/routes";

const LazyProducts = LazyComponent(() => import("./views/Products/Products"));
const LazyNewProduct = LazyComponent(() => import("./views/Products/NewProduct"));
const LazyCategories = LazyComponent(
  () => import("./views/Categories/Categories")
);
const LazyNewCategory = LazyComponent(() => import("./views/Categories/NewCategory"));
const LazyUserPage = LazyComponent(() => import("./views/UserPage"));
const LazyRoot = LazyComponent(() => import("./layout/Root"));

export const dashboardRoutes: RouteObject = {
  path: "dashboard",
  element: <ProtectedRoute element={<LazyRoot />} />,
  children: [
    authRoutes,
    {
      path: "user",
      element: <AuthorizedRoute element={<LazyUserPage />} role="TRADER" />,
    },
    {
      path: "products",
      element: <ProductsRoot />,
      children: [
        {
          index: true,
          element: <LazyProducts />,
        },
        {
          path: "new",
          element: <NewProduct />,
        },
        {
          path: ":id",
          children: [
            {
              // path: "edit",
              index: true,
              element: <LazyNewProduct />,
            }
          ],
        },
      ],
    },
    {
      path: "categories",
      element: <CategoriesRoot />,
      children: [
        {
          index: true,
          element: <LazyCategories />,
        },
        {
          path: "new",
          element: <NewCategory />,
        },
        {
          path: ":id",
          children: [
            {
              index: true,
              // path: "edit",
              element: <LazyNewCategory />,
            },
          ],
        },
      ],
    },
    {
      path: 'not-found',
      element: <ErrorElement/>
    },
    {
      path: '*',
      element: <Navigate to="/dashboard/not-found"/>
    }
  ],
};
