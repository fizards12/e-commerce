import { Link } from "react-router-dom";
import NavbarLink from "../../../components/atoms/NavbarLink";
import { CgProfile } from "react-icons/cg";
import { RiProductHuntFill } from "react-icons/ri";
import Wrapper from "../../../components/atoms/Wrapper/Wrapper";
import { BiCategory } from "react-icons/bi";
const routesLinks = [
  {
    path: "/dashboard/user",
    name: "User",
    Icon: CgProfile,
  },
  {
    path: "/dashboard/categories",
    name: "Categories",
    Icon: BiCategory,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    Icon: RiProductHuntFill,
  },
];
const Sidebar = () => {
  return (
    <nav className="max-w-52 w-full h-full max-md:w-0">
      <Wrapper
        className="h-full max-md:!p-0"
        cardClassName="!p-0 max-md:drawer"
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle md:hidden"
        />
        <div className="max-md:drawer-side z-50 h-full">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="max-md:p-2 h-full max-md:max-w-52 w-full">
            <div className="max-md:bg-white max-md:rounded-box h-full">
              <div className="px-1 items-start flex-col w-full">
                <div className="flex-1 pt-6 flex justify-center">
                  <Link to="/dashboard/user" className="link no-underline">
                    <h4 className="uppercase">daisyUI</h4>
                  </Link>
                </div>
                <div className="divider px-2"></div>
                <ul className="menu w-full gap-1">
                  {routesLinks.map((route) => (
                    <li key={route.path} className="w-full">
                      <NavbarLink to={route.path}>
                        {route.Icon && <route.Icon size={20} />}
                        <span>{route.name}</span>
                      </NavbarLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Sidebar;
