import { useDispatch } from "react-redux";
import Wrapper from "../../../components/atoms/Wrapper/Wrapper";
import { logoutThunk } from "../../../stores/auth/authThunks";
import { AppDispatch } from "../../../stores";
import { BiMenu } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { routesNames } from "../../../stores/app/app";

function Header() {
  const location = useLocation();
  const dispatcher = useDispatch<AppDispatch>();
  return (
    <Wrapper className="h-auto">
      <header className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="drawer-content md:hidden">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost rounded-box drawer-button"
            >
              <BiMenu size={25} />
            </label>
          </div>
          <h4>{routesNames[location.pathname]}</h4>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => {
              dispatcher(logoutThunk());
            }}
            className="btn btn-outline btn-primary border-0 btn-sm"
          >
            Logout
          </button>
        </div>
      </header>
    </Wrapper>
  );
}

export default Header;
