import { Outlet } from "react-router-dom";
import NavbarLink from "../../../../components/atoms/NavbarLink";
import { Suspense } from "react";
import Loading from "../../../../components/Loading";
const productsNavList = [
  {
    path: "",
    name: "Products",
  },
  {
    path: "new",
    name: "New Product",
  },
];
const Root = () => {
  return (
    <div className="flex flex-col h-full gap-3">
      <ul className="flex gap-2">
        {productsNavList.map((item) => (
          <li key={item.path}>
            <NavbarLink
              end
              className={({ isActive }) => (isActive ? "" : "bg-white")}
              to={item.path}
            >
              {item.name}
            </NavbarLink>
          </li>
        ))}
      </ul>
      <div className="flex-1 rounded-box p-4 bg-white">
        <Suspense fallback={<Loading/>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Root;
