import { Outlet } from "react-router-dom";
import Header from "./Header";

const Root = () => {
  return (
    <div className="app-body group">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
