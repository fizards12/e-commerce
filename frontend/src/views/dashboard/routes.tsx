import { Navigate, RouteObject } from "react-router-dom";
import LazyComponent from "../../components/atoms/HOC/lazyComponent";
import AuthorizedRoute from "../../router/AuthorizedRoute";
import ProtectedRoute from "../../router/ProtectedRoute";
import ProductsRoot from "./views/Products/Root";
import CategoriesRoot from "./views/Categories/Root";
import NewProduct from "./views/Products/NewProduct";
import NewCategory from "./views/Categories/NewCategory";
import Product from "./views/Products/Product";
import { categoriesLoader, productsLoader } from "./loadersAndActions";
import ErrorElement from "./layout/ErrorElement";

const LazyProducts = LazyComponent(() => import("./views/Products/Products"));
const LazyCategories = LazyComponent(
  () => import("./views/Categories/Categories")
);
const LazyCategory = LazyComponent(() => import("./views/Categories/Category"));
const LazyUserPage = LazyComponent(() => import("./views/UserPage"));
const LazyRoot = LazyComponent(() => import("./layout/Root"));

export const dashboardRoutes: RouteObject = {
  path: "dashboard",
  element: <ProtectedRoute element={<LazyRoot />} />,
  loader: async(args,handler) => {
    await categoriesLoader(args,handler);
    await productsLoader(args,handler);

  },
  children: [
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
              index: true,
              element: <Product />,
            },
            {
              path: "edit",
              element: <NewProduct />,
            },
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
              element: <LazyCategory />,
            },
            {
              path: "edit",
              element: <NewCategory />,
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
