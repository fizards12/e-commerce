import { Outlet } from "react-router-dom";
import Container from "../../../../components/atoms/Container/Container";
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
    <div>
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
      <Container cardClassName="p-2">
        <Suspense fallback={<Loading/>}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  );
};

export default Root;
