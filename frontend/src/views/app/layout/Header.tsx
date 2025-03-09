import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../stores";
import { logoutThunk } from "../../../stores/auth/authThunks";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className="navbar bg-primary/10 shadow-md w-full bg-base-100 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/dashboard">
            <h3>Logo</h3>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <button
              onClick={() => dispatch(logoutThunk())}
              className="btn btn-primary rounded-full"
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-primary rounded-full" to="/auth/login">
                Login
              </Link>
              <Link
                className="btn btn-primary btn-outline rounded-full"
                to="/auth/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
