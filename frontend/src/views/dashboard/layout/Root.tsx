import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Root = () => {
  return (
    <div className="w-full flex h-screen">
      <Sidebar />
      <div className="flex w-full flex-col h-full">
        <Header />
        <div className="flex-1 w-full">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
