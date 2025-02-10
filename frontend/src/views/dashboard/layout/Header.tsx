import { useDispatch } from "react-redux";
import Wrapper from "../../../components/atoms/Wrapper/Wrapper";
import { logoutThunk } from "../../../stores/auth/authThunks";
import { AppDispatch } from "../../../stores";
import { BiMenu } from "react-icons/bi";

function Header() {
  const dispatcher = useDispatch<AppDispatch>();
  return (
    <Wrapper>
      <header className="p-2 w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="drawer-content md:hidden">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost rounded-box drawer-button"
            >
              <BiMenu size={25} />
            </label>
          </div>
          <h2>DaisyUI</h2>
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
