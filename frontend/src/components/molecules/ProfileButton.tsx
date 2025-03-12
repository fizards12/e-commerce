import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../stores";
import { logoutThunk } from "../../stores/auth/authThunks";

const ProfileButton: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary btn-circle btn-sm btn-outline border-0">
        <FiUser size={22} />
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 overflow-hidden relative menu menu-compact dropdown-content bg-sky-200/40 backdrop-blur-xs rounded-box w-52"
      >
        {/* Background */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-sky-200/20 "></div> */}
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={()=>dispatch(logoutThunk())}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;
