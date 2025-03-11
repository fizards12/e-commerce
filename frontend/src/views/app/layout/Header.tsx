import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../stores";
import NavbarLink from "../../../components/atoms/NavbarLink";
import { IoIosArrowDown } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import ProfileButton from "../../../components/molecules/ProfileButton";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <nav className="navbar relative w-full p-4 py-6 border-b border-gray-300 ">
      <div className="container max-w-6xl mx-auto md:justify-between flex items-center">
        <div>
          <Link to="/">
            <h3 className="text-primary">Exclusive</h3>
          </Link>
        </div>
        <div className="max-md:-order-1 group/menu">
          <div className="overflow-hidden max-md:w-full max-md:max-h-0 max-md:transition-[max-height] max-md:duration-500 max-md:group-hover/menu:max-h-64 max-md:absolute max-md:top-full max-md:left-0 max-md:border-b max-md:border-gray-300 max-md:bg-white z-20">
            <ul className="flex md:gap-10 md:items-center max-md:w-full max-md:p-3 max-md:flex-col max-md:gap-4">
              <li>
                <NavbarLink variant="link" size="md" to="/">
                  Home
                </NavbarLink>
              </li>
              <li>
                <NavbarLink variant="link" size="md" to="/contact">
                  Contact
                </NavbarLink>
              </li>
              <li>
                <NavbarLink variant="link" size="md" to="/about">
                  About
                </NavbarLink>
              </li>
              <li>
                <NavbarLink variant="link" size="md" to="/auth/register">
                  Signup
                </NavbarLink>
              </li>
            </ul>
          </div>
          <button className="md:hidden py-2 btn-link btn-sm btn-primary">
            <IoIosArrowDown size={20} />
          </button>
        </div>
        {/* Header Actions */}
        <div className="flex gap-2 max-md:ms-auto items-center">
          <div className="p-2">
            <Link
              to="/cart"
              className="btn btn-primary btn-outline btn-sm btn-circle border-0"
            >
              <BsCart3 className="font-extrabold" size={22} />
            </Link>
          </div>
          {isAuthenticated ? (
            <div>
              <ProfileButton />
            </div>
          ) : (
            <Link className="btn btn-primary btn-outline border-0 rounded-full" to="/auth/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
