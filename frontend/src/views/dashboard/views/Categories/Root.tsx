import { Outlet } from "react-router-dom";
import Container from "../../../../components/atoms/Container/Container";
import NavbarLink from "../../../../components/atoms/NavbarLink";
const productsNavList = [
  {
    path: "",
    name: "Categories",
  },
  {
    path: "new",
    name: "New Category",
  }
];
const Root = () => {
  return (
    <div className="flex flex-col h-full">
      <Container cardClassName="!bg-transparent shadow-none overflow-visible">
      <ul className="flex gap-1">
        {productsNavList.map((item) => (
          <li key={item.path}>
            <NavbarLink
              end
              className={({ isActive }) => ( "shadow-md " + (isActive ? "" : "bg-white"))}
              to={item.path}
            >
              {item.name}
            </NavbarLink>
          </li>
        ))}
      </ul>
      </Container>
      <Container cardClassName="p-2 flex-1" className="flex-1">
        <Outlet />
      </Container>
    </div>
  );
};

export default Root;
