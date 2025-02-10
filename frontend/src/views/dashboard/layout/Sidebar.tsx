import { Link } from "react-router-dom";
import NavbarLink from "../../../components/atoms/NavbarLink";
import { CgProfile } from "react-icons/cg";
import { RiProductHuntFill } from "react-icons/ri";
import Container from "../../../components/atoms/Container/Container";
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
    <Container>
      <div className="navbar px-1 items-start flex-col w-64 max-w-56">
        <div className="flex-1">
          <Link to="/dashboard/user" className="btn btn-ghost btn-lg">
            <h4 className="uppercase">daisyUI</h4>
          </Link>
        </div>
        <div className="divider"></div>
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
    </Container>
  );
};

export default Sidebar;
