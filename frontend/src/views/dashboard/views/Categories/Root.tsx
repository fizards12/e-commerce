import { Outlet } from "react-router-dom";
import Wrapper from "../../../../components/atoms/Wrapper/Wrapper";
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
      <Wrapper cardClassName="!bg-transparent shadow-none overflow-visible">
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
      </Wrapper>
      <Wrapper cardClassName="p-2 flex-1" className="flex-1">
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default Root;
